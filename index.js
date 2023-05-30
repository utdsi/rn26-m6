
const express = require("express")

const app = express()

app.use(express.json())

require('dotenv').config()


const {connection} = require("./config/db.js")
const {userRouter} = require("./routes/user.route.js")
const {flightRouter} = require("./routes/flight.route.js")

app.get("/",(req,res)=>{

    res.send("welcome to ticket booking app")
})

app.use("/",userRouter)
app.use("/",flightRouter)


app.listen(process.env.port,async()=>{

    try {
        
        await connection
        console.log("connected to db")
    } catch (error) {

        console.log(error)
        
    }

    console.log(`listgening on port ${process.env.port}`)

})