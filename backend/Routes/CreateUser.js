const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const jwtSecert = "Mynameisabubakarthatisgood##@"

router.post('/createuser',[
body('email' , 'Enter correct format of email!').isEmail(),
body('name' , 'Enter name containing charater more than 5 characters!').isLength({ min: 5 }),
body('password', 'Password must be greater than 5 characters!').isLength({ min: 5 })],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

  try {
    const newUser = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location,
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while creating the user' });
  }
});

router.post('/loginuser' ,[
  body('email' , 'Enter correct format of email!').isEmail(),
  body('password', 'Incorrect Password!').isLength({ min: 5 })] , async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  let email = req.body.email;  
  try {
      let userData = await User.findOne({email});
      if(!userData){
        return res.status(400).json({errors:"Try logging with correct credentails"})
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if(!pwdCompare){
        return res.status(400).json({errors:"Try logging with correct credentails"})
      }

      const data={
        user:{
          id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecert)

      res.json({ success: true, authToken:authToken});
    } catch (error) {
      console.error('User creation error:', error);
      res.status(500).json({ success: false, error: 'An error occurred while creating the user' });
    }
  });

module.exports = router;


/*const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post("/createuser", async (req,res) => {
    try{
            await User.create({
                name : "Sham Das",
                password : "12345",
                email: "shamdas12@gmail.com",
                location : "kanpur"
            })
        res.json({sucess : true});
    }catch(error){
        
        res.json({sucess : false});
    }
})

module.exports = router;*/