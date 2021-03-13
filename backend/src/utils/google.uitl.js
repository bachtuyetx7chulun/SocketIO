const { google } = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_ID } = require('../config/index')
const axios = require('axios')

const googleConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_ID,
  redirect: 'http://localhost:5000/users/auth/google/callback',
}

// TODO: Connection function
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/user.phonenumbers.read',
]

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope,
  })
}

function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth })
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
  const auth = createConnection()
  const url = getConnectionUrl(auth)
  return url
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
// async function getGoogleAccountFromCode(code) {
//   const auth = createConnection()
//   const { tokens } = await auth.getToken(code)
//   auth.setCredentials(tokens)
//   const plus = getGooglePlusApi(auth)
//   const me = await plus.people.get({ userId: 'me' })
//   const userGoogleId = me.data.id
//   const userGoogleEmail =
//     me.data.emails && me.data.emails.length && me.data.emails[0].value
//   return {
//     id: userGoogleId,
//     email: userGoogleEmail,
//     tokens: tokens,
//   }
// }

async function getGoogleAccountFromCode(code) {
  try {
    const auth = createConnection()
    const { tokens } = await auth.getToken(code)
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    return googleUser.data
  } catch (error) {
    return error
  }
}

module.exports = {
  urlGoogle,
  createConnection,
  getGoogleAccountFromCode,
}
