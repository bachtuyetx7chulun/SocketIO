const Joi = require('joi')

const userCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(18).required(),
  password: Joi.string().required().min(6),
  phone: Joi.number().min(10).max(11),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(6).required(),
})

const userLoginSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(18).required(),
  password: Joi.string().required().min(6),
})

const validateForm = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) return next(error)
    return next()
  }
}

const userSchema = {
  userCreateSchema,
  userLoginSchema,
}

module.exports = {
  validateForm,
  schema: {
    userSchema,
  },
}
