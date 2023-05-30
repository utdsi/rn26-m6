

const express = require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

require('dotenv').config()

const userRouter = express.Router()

const {UserModel} = require("../model/user.model.js")

userRouter.post("/api/register",async(req,res)=>{

    const {name,email,password} = req.body

    try {

        bcrypt.hash(password, 7,async  function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log({"msg":err})
            }else{
                const user =  new UserModel({name,email,password:hash})

                await user.save()

                res.send("user signup successfull")
            }
        });
        

    } catch (error) {

        console.log(error)
        
    }
})


userRouter.post("/api/login",async (req,res)=>{

    const {email,password} = req.body

    try {
        
        const user  = await UserModel.findOne({email})

        if(user){

            const hash_password = user.password
            bcrypt.compare(password, hash_password, function(err, result) {

                if(result){

                    const token = jwt.sign({ "Userid":user._id }, process.env.pass);

                    res.send({"msg":"login successfull","token":token})
                }else{
                    res.send("login failed")
                }
                // result == false
            });
            
        }else{
            res.send("login failed")
        }
    } catch (error) {

        console.log(error)
        
    }

})


module.exports = {userRouter}