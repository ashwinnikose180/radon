const book = require("../models/bookModel");
const mongoose = require("mongoose");
const user = require("../models/userModel");
const review = require("../models/reviewModel");
const aws =require("../controllers/aws")

const createLink = async function(req,res)
{
  try{
  let files = req.files
  if(files && files.length>0)
  {
   let uploadFileURL = await aws.uploadFile(files[0])
   res.status(201).send({status:true, URL:uploadFileURL})
  }else{
    res.status(400).send({ msg: "No file found" })
  }
}catch(error){
  res.status(500).send({msg: error.message})
}
}
const createBook = async (req, res) => {
    try {
        let bookData = req.body;

        if (Object.keys(bookData).length == 0) {
            return res.status(400).send({ status: false, message: "mandatory feilds can not be empty" })
        }
        let { title, userId, ISBN, category, subcategory, excerpt, releasedAt } = bookData;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "enter valid userId" })
        }

        // title validation
        if (title) {
            if (title.trim().length === 0) {
                return res.status(400).send({ status: false, message: "Title can not be empty" })
            }
        }
        else { return res.status(400).send({ status: false, message: "Title is a required field" }) }

        let isUniqueTitle = await book.findOne({ title: title });
        if (isUniqueTitle) {
            return res.status(400).send({ status: false, message: "This title is being already used" })
        }

        // excerpt validation
        if (excerpt) {
            if (excerpt.trim().length === 0) {
                return res.status(400).send({ status: false, message: "excerpt can not be empty" })
            }
        }
        else { return res.status(400).send({ status: false, message: "excerpt is a required field" }) }

        if (userId) {
            let validUserId = mongoose.isValidObjectId(userId);
            if (!validUserId) {
                return res.status(400).send({ status: false, message: "This is not a valid user id" })
            }

            let findUser = await user.findOne({ _id: userId });
            if (!findUser) {
                return res.status(404).send({ status: false, message: "User with this Id does not exist" })
            }
        }
        else { return res.status(400).send({ status: false, message: "User Id is a required field" }) }

        if (ISBN) {
            let isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g
            if (!ISBN.match(isbnPattern)) {
                return res.status(400).send({ status: false, message: "Please provide a valid 13 digit ISBN number" })
            }

            const regex = new RegExp("-")
            for (let i = 0; i < ISBN.length; i++) {
                if ((ISBN.match(regex) || []).length >= 1) {
                    ISBN = ISBN.replace(regex, '')
                }
            }
            bookData.ISBN = ISBN
        }
        else { return res.status(400).send({ status: false, message: "ISBN Number is a required field" }) }

        let isUniqueISBN = await book.findOne({ ISBN: ISBN });

        if (isUniqueISBN) {
            return res.status(400).send({ status: false, message: "This ISBN is already being used" })
        }

        // category validation
        if (category) {
            if (category.trim().length === 0) {
                return res.status(400).send({ status: false, message: "category cannot be empty" })
            }
            bookData.category = category
        }
        else { return res.status(400).send({ status: false, message: "category is a required field" }) }

        if (typeof subcategory == "string") {
            if (subcategory.trim().length === 0) {
                return res.status(400).send({ status: false, message: "subcategory cannot be empty" })
            }
        }

        if (Array.isArray(subcategory)) {
            let uniqueSub = [...new Set(subcategory)];
            for (let i=0;i<uniqueSub.length;i++) {
                if (typeof uniqueSub[i] != "string") return res.status(400).send({ status: false, message: "subcategory element must be of type string" })
                if (uniqueSub[i].trim().length == 0) return res.status(400).send({ status: false, message: "subcategory element cannot be empty" })
            }
            bookData.subcategory = uniqueSub;
        }

        if (!subcategory) { return res.status(400).send({ status: false, message: "subcategory is a required field" }) }

        if (releasedAt) {
            let datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g
            if (!releasedAt.match(datePattern)) {
                return res.status(400).send({ status: false, message: "Date format is not valid" })
            }  //'1998-10-24'
        }
        else { return res.status(400).send({ status: false, message: "Released date is a required field" }) }


        let saveBook = await book.create(bookData);
        return res.status(201).send({ status: true, message: "your book has been saved", data: saveBook })

    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

//====================================================updateBook==================================================//
const updateBook = async function (req, res) {
    try {
        let id = req.params.bookId;
        const data = req.body;

        if (id.length == 0) {
            return res.status(400).send({ status: false, message: "BookId cannot be empty" })
        }

        if (!mongoose.isValidObjectId(id))
            return res.status(400).send({ status: false, message: "Please enter valid id" })

        const findBook = await book.findOne({ _id: id, isDeleted: false })

        if (!findBook) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        if (data.excerpt) {
            if (data.excerpt.trim().length == 0)
                return res.status(400).send({ status: false, message: "excerpt cannot be empty" })

            findBook.excerpt = data.excerpt
        }

        if (data.title) {
            if (data.title.trim().length == 0)
                return res.status(400).send({ status: false, message: "title cannot be empty" })

            const checkDuplicateTitle = await book.findOne({ title: data.title, isDeleted: false })
            if (checkDuplicateTitle) return res.status(400).send({ status: false, message: "same title alredy exist" })
            findBook.title = data.title
        }

        if (data["releasedAt"]) {
            let datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g
            if (!data["releasedAt"].match(datePattern)) {
                return res.status(400).send({ status: false, message: "Date format is not valid" })
            }
            findBook.releasedAt = data["releasedAt"]
        }

        if (data.ISBN) {
            let isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g
            if (!data.ISBN.match(isbnPattern)) {
                return res.status(400).send({ status: false, message: "Please provide a valid ISBN number" })
            }

            const checkDuplicateISBN = await book.findOne({ ISBN: data.ISBN, isDeleted: false })
            if (checkDuplicateISBN) return res.status(400).send({ status: false, message: "same ISBN alredy exist" })

            findBook.ISBN = data.ISBN
        }

        findBook.save();
        return res.status(200).send({ status: true, message: "Successfully updated", data: findBook })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//========================================================get books====================================================//

const getBook = async (req, res) => {
    try {
        let data = req.query
        let { userId, category } = data
        let filter = {
            isDeleted: false,
        };

        if (userId) {
            let verifyuser = mongoose.isValidObjectId(userId)
            if (!verifyuser) {
                return res.status(400).send({ status: false, message: "this is not a valid user Id" })
            }

            let findbyUserId = await book.findOne({ userId });
            if (!findbyUserId) {
                return res.status(404).send({ status: false, message: "no books with this userId exists" })
            }
            filter["userId"] = userId
        }
        if (category) {
            let findbyCategory = await book.findOne({ category: category })
            if (!findbyCategory) {
                return res.status(404).send({ status: false, message: "no books with this category exists" })
            }
            filter["category"] = category
        }

        if (data.subcategory) {
            let subCatArray = { "$in": data.subcategory.split(",") }
            console.log(subCatArray)
            let findbysubcategory = await book.findOne({ subcategory: subCatArray })
            if (!findbysubcategory) {
                return res.status(404).send({ status: false, message: "no books with this subcategory exists" })
            }
            filter["subcategory"] = subCatArray
        }
        let findBook = await book.find(filter).select({ _id: 1, title: 1, subcategory: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, }).sort({ title: 1 })

        if (!findBook.length) {
            return res.status(404).send({ status: false, message: "No books with the given filter found" })
        }
        else {
            return res.status(200).send({ status: true, message: "Books list", data: findBook })
        }
    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}


//=======================================================get books by id===========================================================//

const getBookById = async (req, res) => {
    try {
        let bookId = req.params.bookId

        if (bookId) {
            let verifyBookId = mongoose.isValidObjectId(bookId)
            if (!verifyBookId) {
                return res.status(400).send({ status: false, message: "this is not a valid bookId " })
            }
        }
        else { return res.status(400).send({ status: false, message: "Book Id must be present in order to search it" }) }

        let findBook = await book.findOne({ _id: bookId }).lean()

        if (!findBook) {
            return res.status(404).send({ status: false, message: "No document exists with this book Id" })
        }

        if (findBook.isDeleted === true) {
            return res.status(404).send({ status: false, message: "This book has been deleted by the user" });
        }

        let findReview = await review.find({ bookId: findBook._id, isDeleted: false })

        findBook["reviewsData"] = findReview

        return res.status(200).send({ status: true, message: "Book details", data: findBook })
    } catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

const deleteBookById = async (req, res) => {
    try {
        let bookId = req.params.bookId

        if (bookId) {
            let verifyBookId = mongoose.isValidObjectId(bookId)
            if (!verifyBookId) {
                return res.status(400).send({ status: false, message: "this is not a valid bookId " })
            }
        }
        else { return res.status(400).send({ status: false, message: "Book Id must be present in order to perform delete operation" }) }

        let findBook = await book.findOne({ _id: bookId, isDeleted: false })

        if (!findBook) {
            return res.status(404).send({ status: false, message: "No document exists with this book Id" })
        }

        await book.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } })

        return res.status(200).send({ status: true, message: "Succesful" });
    } catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}



module.exports = { createBook, getBook, getBookById, updateBook, deleteBookById,createLink };
