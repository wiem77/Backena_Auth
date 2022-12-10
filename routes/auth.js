const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
//require bcrypte
const bcrypt = require("bcrypt")
//require web-token
const jst = require("jsonwebtoken")
//validator
const {
  validator,
  registerRules,
  loginRules,
} = require("../middlewaers/validator")
//import isauth middleware
const isAuth = require("../middlewaers/isAuth")
//import User
const User = require("../models/User")
router.get("/test", (req, res) => {
  res.send("tested")
})
//@route POST api/auth/register
//@desc Register new user
//@access Public
router.post("/register", registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body
  try {
    //chechk exixtence users
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "Users already exixtes" })
    }
    //Create new user
    user = new User({ name, lastName, email, password })
    //create salt hash
    const salt = 10
    const hasdPassWord = await bcrypt.hash(password, salt)
    user.password = hasdPassWord
    //save user
    await user.save()
    //signuser
    const payload = {
      id: user._id,
    }
    const token = await jst.sign(payload, process.env.SERCRETSTRING)
    res.status(200).json({ msg: "registed with success", user, token })
  } catch (error) {
    res.status(500).json({ msg: "server erreur" })
  }
})
//@route POST api/auth/loggin
//@desc  LOggin
//@access Public
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ msg: "User not existe emails" })
    }
    //chechk pwd
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).send({ msg: "bad Credentials pwd" })
    }
    const payload = {
      id: user._id,
    }
    const token = await jst.sign(payload, process.env.SERCRETSTRING)
    res.send({ msg: "logged with success", user, token })
  } catch (error) {
    res.status(500).json({ msg: "server erreur" })
  }
})
//@route POST api/auth/user
//@desc Register new user
//@access Private
router.get("/user", isAuth, (req, res) => {
  res.status(200).send({ user: req.user })
})
module.exports = router
