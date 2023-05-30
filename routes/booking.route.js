const express = require("express")

const bookingRouter = express.Router()

const {BookingModel}  = require("../model/booking.model.js")
const {FlightModel} = require("../model/flights.model.js")
const {UserModel}  = require("../model/user.model.js")
const {auth} = require("../middleware/auth.js")

bookingRouter.post("/api/booking",auth,async(req,res)=>{

    const {Userid,flighid} = req.body

    const flight = await FlightModel.findOne({_id:flighid})

    const user = await UserModel.findOne({_id:Userid})

    const data = {user,flight}

    const booking  = new BookingModel(data)

    await booking.save()
    //console.log(flighid)

    res.send("booking done")


})

bookingRouter.get("/api/dashboard",auth,async (req,res)=>{

    const bookings = await BookingModel.find()

    res.send(bookings)



})

module.exports = {bookingRouter}