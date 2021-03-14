const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(18).required(),
  password: Joi.string().required().min(6),
  phone: Joi.number().min(10).max(11),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(6).required(),
})

const validateForm = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) return next(error)
    return next()
  }
}

module.exports = {
  validateForm,
  schema: {
    userSchema,
  },
}
