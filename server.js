const express = require('express')

const app = express()
const port = process.env.port || 5000

app.get("/api",(req,res)=>{
    res.json("Hello Bears Team 05!!")
})

const listener = app.listen(port,()=>{
    console.log(`Server listening on port ${listener.address().port}`)
})