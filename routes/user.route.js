

const express = require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

require('dotenv').config()

const userRouter = express.Router()

const {UserModel} = require("../model/user.model.js")

userRouter.post("/signup",async(req,res)=>{

    const {name,email,password} = req.body

    try {

        bcrypt.hash(password, 7,async  function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log({"msg":err})
            }else{
                const user = await new UserModel({name,email,password})

                await user.save()

                res.send("user signup successfull")
            }
        });
        

    } catch (error) {

        console.log(error)
        
    }
})


module.exports = {userRouter}