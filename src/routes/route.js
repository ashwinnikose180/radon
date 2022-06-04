const express =require('express');
const router =express.Router();
const bookModel =require("../models/bookModel")
const bookController = require("../controllers/bookController")

router.get("/Books", function(req,res){
    res.send("My first ever api!")
})

router.post("/createNewBook",bookController.createNewBook)

router.get("/getAllBook",bookController.getAllBook)

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// module.exports = router;