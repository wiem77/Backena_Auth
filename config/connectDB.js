const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })
const connectDB = () => {
  mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })

    .then(() => console.log("mongoose connected")) //promes
    .catch(() => console.log("erreur database"))
}
module.exports = connectDB
