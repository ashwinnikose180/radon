const express = require('express');
const router = express.Router();
const bookController= require("../controllers/bookController")
const bookModel= require("../models/bookModel")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook",bookController.createBook)

router.get("/bookList",bookController.bookList)

router.get("/getBooksInYear",bookController.getBooksInYear)

router.get("/getParticularBooks",bookController.getParticularBooks)

router.get("/getRandomBooks",bookController.getRandomBooks)


router.get("/getXINRBooks",bookController.getXINRBooks)


module.exports=router


// const express = require('express');
// const router = express.Router();
// // const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

// module.exports = router;