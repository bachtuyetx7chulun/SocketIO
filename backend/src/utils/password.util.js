const bcrypt = require('bcrypt')
const saltRounds = 10
// const salt = bcrypt.genSaltSync(saltRounds)
// ! IMPORTANT NOTE:
// ! Salt function above will generate new code each time call, hence you need to use static variable salt value ✌
// * Make sure you can get new salt by with using the salt function()
const salt = '$2b$10$Rd35QeoQwhXSJ8jRrITEHu'

const hashPassword = password => {
  return (hash = bcrypt.hashSync(password, salt))
}

const comparePassword = (currentPassword, hasPassword) => {
  return bcrypt.compareSync(currentPassword, hasPassword)
}

module.exports = {
  hashPassword,
  comparePassword,
}
