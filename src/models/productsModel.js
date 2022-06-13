
const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: String,
    category: String,
    price : {
        type : Number,
        required : true
    }
})

module.exports = new mongoose.model('Product', productsSchema)






















// const mongoose = require('mongoose')
// const ObjectId =mongoose.Schema.Types.ObjectId

// const orderSchema = new mongoose.Schema({
//     userId:{
//         type : ObjectId,
//         ref : 'User'
//     }, 
//     productId : {
//         type : ObjectId,
//         ref : 'Product'
//     },
//     amount : Number,
//     isFreeAppUser : Boolean,
//     date: Date,
// }, {timestamps: true})

// module.exports = new mongoose.model('Order', orderSchema)






















// const mongoose = require('mongoose');

// const authorSchema = new mongoose.Schema( {
//     author_id : Number,
//     author_name: String,
//     age: Number,
//     address: String

// }, { timestamps: true });

// module.exports = mongoose.model('Author', authorSchema)
