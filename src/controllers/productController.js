const productModel = require("../models/productsModel")
// const express = require("express")

const createProduct = async function(req, res){
 let data = req.body 
 if( await productModel.exists(data)){
     res.send({
        msg : "this product already exist"
     })
 }else{
     let createData = await productModel.create(data)
     res.send({msg: createData})
 }
}

module.exports.createProduct = createProduct





// const { count } = require("console")
// const authorModel= require("../models/authorModel")

// const createAuthor= async function (req, res) {
//     let data = req.body
//     let authorId = data.dauthor_id
//     if(!authorId) return res.send({msg: 'AuthorId is mandatory in the request'})

//     let savedData= await authorModel.create(data)
//     res.send({data: savedData})
// }

// module.exports.createAuthor= createAuthor
