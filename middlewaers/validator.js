const { body, validationResult } = require("express-validator")
const registerRules = () => [
  body("name", " name is REQUIRED  ").notEmpty(),
  body("lastName", " lastname is REQUIRED  ").notEmpty(),
  body("email", " email is REQUIRED  ").notEmpty(),
  body("password", "password must conatin 8 charter").isLength({
    min: 8,
    max: 20,
  }),
]
const loginRules = () => [
  body("email", " email is REQUIRED  ").notEmpty(),
  body("password", "password must conatin 8 charter").isLength({
    min: 4,
    max: 20,
  }),
]
//middleware Validator
const validator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }
  next()
}
module.exports = { validator, registerRules, loginRules }
