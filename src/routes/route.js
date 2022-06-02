const express = require('express');
const router=express.Router();

router.get('/movies', function (req,res){
     const movie=['SPIDERMAN','KRISH','BATMAN','TITANIC','RAAZ','ALONE']
     res.send(movie)
})


          
router.get('/movies/:indexNumber', function (req,res){
         const movie=['SPIDERMAN','KRISH','BATMAN','TITANIC','RAAZ','ALONE']   
         const id = req.params.indexNumber   
        if(id < movie.length){
            res.send(movie[id])
        }else{
            res.send ('used valid index')
        }
})

router.get('/films', function (req,res){
  const movie=[{
    'id': 1,
    'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nemo'
   }]
   res.send(movie)
})

router.get('/films/:filmId', function (req,res){
    const movie=[{
      'id': 1,
      'name': 'The Shining'
     }, {
      'id': 2,
      'name': 'Incendies'
     }, {
      'id': 3,
      'name': 'Rang de Basanti'
     }, {
      'id': 4,
      'name': 'Finding Nemo'
     }]
     const Id= req.params.filmId
     if(Id < movie.length){
        res.send(movie[Id])
     }   else{
         res.send('No movie exists with this id')
     }   
     
    
  })
  

module.exports = router;

// const express = require('express');
// const myHelper = require('../util/helper')
// const underscore = require('underscore')

// const router = express.Router();

// router.get('/test-me', function (req, res) {
//     myHelper.printDate()
//     myHelper.getCurrentMonth()
//     myHelper.getCohortData()
//     let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
//     console.log('The first element received from underscope function is '+firstElement)
//     res.send('My first ever api!')
// });

// router.get('/hello', function (req, res) {
   
//     res.send('Hello there!')
// });

// router.get('/candidates', function(req, res){
//     console.log('Query paramters for this request are '+JSON.stringify(req.query))
//     let gender = req.query.gender
//     let state = req.query.state
//     let district = req.query.district
//     console.log('State is '+state)
//     console.log('Gender is '+gender)
//     console.log('District is '+district)
//     let candidates = ['Akash','Suman']
//     res.send(candidates)
// })

// router.get('/candidates/:canidatesName', function(req, res){
//     console.log('The request objects is '+ JSON.stringify(req.params))
//     console.log('Candidates name is '+req.params.canidatesName)
//     res.send('Done')
// })



// adding this comment for no reason