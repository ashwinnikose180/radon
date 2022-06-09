const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "author",
        required: true
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref: "publisher",
        required: true
    },
    isHardcover :{
        type : Boolean,
        default : false
    }

}, { timestamps: true });


module.exports = mongoose.model('book', bookSchema)
