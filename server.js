//Require express
const express = require("express")
const app = express()

//Connectdb
const connectDB = require("./config/connectDB")
connectDB()
//middleware
app.use(express.json())
//routes
app.use("/api/auth/", require("./routes/auth"))

//create PORT
const port = process.env.PORT || 5000
//lunch
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`the server is runnig on ${port}`)
)
