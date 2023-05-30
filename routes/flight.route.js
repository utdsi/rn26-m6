const express = require("express")

const flightRouter = express.Router()

const {FlightModel} =  require("../model/flights.model.js")

flightRouter.get("/api/flights",async(req,res)=>{

    const flights = await FlightModel.find()

    res.send(flights)
})

flightRouter.get("/api/flights/:id",async(req,res)=>{
    const id = req.params.id

    const flight = await FlightModel.find({_id:id})

    res.send(flight)
})

flightRouter.post("/api/flights",async(req,res)=>{

    const payload = req.body

    const new_flight = new FlightModel(payload)

    await new_flight.save()

    res.send("flight made sucees")
})

flightRouter.patch("/api/flights/:id",async(req,res)=>{

    const payload = req.body

    const id = req.params.id

    const flight = await FlightModel.findByIdAndUpdate({_id:id},payload)

    res.send("fligth updated success")
})

flightRouter.delete("/api/flights/:id",async(req,res)=>{

   

    const id = req.params.id

    const flight = await FlightModel.findByIdAndDelete({_id:id})

    res.send("fligth deleted success")
})

module.exports = {flightRouter}