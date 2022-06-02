const express = require('express');
const router = express.Router();
const logger =require ('../logger/logger.js')
const helper = require ('../util/helper.js')
const formatter=require('../validator/formatter.js')



router.get('/test-me', function (req, res) {

   logger.welcome()
   helper.printDate()
   helper.printMonth()
   helper.getBatchInfo()
   formatter.trim()
   formatter.string1()
   formatter.string2()
   
    res.send('My first ever api!')
});


router.get('/hello',function(req,res){
   

let year = ['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPT','OCT','NOV','DEC']
let _= require("lodash");
console.log(_.chunk(year,3))
res.send('loadash installed')

})
let array =[1,3,5,7,9,11,13,15,17,19.]

const _ = require('lodash');
 let newArray = _.tail(array);
  
 console.log(newArray);

let array1=[1,2,3,4,5]
let array2=[1,3,4,6,7]
let array3=[1,3,6,7,9]
let array4=[3,4,6,7,9]
let array5=[1,3,6,7,9]

console.log(_.union(array1,array2,array3,array4,array5))

let movie= [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','fans Labyrinth']]
console.log(_.fromPairs(movie))



module.exports = router;






// const express = require('express');
// const externalModule = require('./logger')

// const express = require('express');

// router.get('/test-me', function (req, res) {
//     console.log('The constant in logger route has a value '+externalModule.endpoint)
//     console.log('The current batch is '+externalModule.batch)
//     externalModule.log()
//     outer.get('/test-me', function (req, res) {

// router.get('/test-me1', function (req, res) {
//     res.send('My second ever api!')
// });

// router.get('/test-me2', function (req, res) {
//     res.send('My third api!')
// });

// router.get('/test-me3', function (req, res) {
//     res.send('My 4th api!')
// });

// router.get('/test-me4', function (req, res) {
//     res.send('My last api!')
// });

//module.exports = router;
// adding this comment for no reason