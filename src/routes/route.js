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

    res.send('My first ever api!')
});









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

module.exports = router;
// adding this comment for no reason