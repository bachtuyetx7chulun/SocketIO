const {
  MAIL_AUTH_PASSWORD,
  MAIL_AUTH_USERNAME,
  MAIL_HOST_NAME,
  MAIL_HOST_PORT,
  MAIL_SECURE,
} = require('../../../config/index')
const nodemailer = require('nodemailer')
const configs = {
  host: MAIL_HOST_NAME,
  port: MAIL_HOST_PORT,
  secure: MAIL_SECURE === 'false' ? false : false,
  auth: {
    user: MAIL_AUTH_USERNAME,
    pass: MAIL_AUTH_PASSWORD,
  },
}

module.exports = {
  jobName: 'Active_User',
  jobHandle: async data => {
    try {
      const { email, verifyToken, username } = data
      let transporter = nodemailer.createTransport(configs)

      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: 'hoaixenhgai@gmail.com',
        subject: 'Hello ✔', // Subject line
        html: '<b>Hello world?</b>', // html body
      })

      console.log(info)
    } catch (error) {
      console.log(error)
    }
  },
}
