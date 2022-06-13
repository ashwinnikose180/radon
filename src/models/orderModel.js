
const mongoose = require('mongoose')
const ObjectId =mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId:{
        type : ObjectId,
        ref : 'User'
    }, 
    productId : {
        type : ObjectId,
        ref : 'Product'
    },
    amount : Number,
    isFreeAppUser : Boolean,
    date: String,
}, {timestamps: true})

module.exports = new mongoose.model('Order', orderSchema)







// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema( {
//     bookName: String, 
//     authorName: String, 
//     tags: [String],
    
//     isPublished: Boolean,
//     prices: {
//         indianPrice: String,
//         europePrice: String,
//     },
//     sales: {type: Number, default: 10},
    
//     // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
//     // {
//         // "ch1 ": "awesome intro to JS",
//         // "ch2" : "intro to nodejs",
//         // "ch3" : "intro to db"
//     //  }
//     summary :  mongoose.Schema.Types.Mixed,
//     isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")

// }, { timestamps: true });


// module.exports = mongoose.model('Book', bookSchema) //users
