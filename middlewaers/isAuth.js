const jwt = require("jsonwebtoken")
const User = require("../models/User")

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"] //
    //chechk_token
    if (!token) {
      return res.status(401).send({ msg: "auth denneid" })
    }
    const decodeed = await jwt.verify(token, process.env.SERCRETSTRING)
    //add user from payload
    const user = await User.findById(decodeed.id)
    //chechk for user
    if (!user) {
      return res.status(401).send({ msg: " auth dennied" })
    }
    //createuser
    req.user = user
    next()
  } catch (err) {
    return res.satatus(400).send({ msg: "token is not valid" })
  }
}
module.exports = isAuth
