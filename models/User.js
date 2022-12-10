const mongoose = require("mongoose")
const schema = mongoose.Schema
const userSchema = new schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})
module.exports = User = mongoose.model("User", userSchema)
