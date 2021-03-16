const {
  MAIL_PASSWORD,
  MAIL_USERNAME,
  MAIL_NAME,
  MAIL_PORT,
  MAIL_PROVIDER,
} = require('../../../config/index')
const nodemailer = require('nodemailer')
let configs = {}
if (MAIL_PROVIDER === 'mailtrap') {
  configs = {
    host: MAIL_NAME,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  }
} else {
  configs = {
    host: MAIL_NAME,
    port: MAIL_PORT,
    secure: false,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  }
}

module.exports = {
  jobName: 'Active_User',
  jobHandle: async data => {
    try {
      const { email, verifyToken, username } = data
      let transporter = nodemailer.createTransport(configs)

      let info = await transporter.sendMail({
        from: '"SocketIO 💖" <foo@example.com>',
        to: email,
        subject: 'Welcome To SocketIO Realtime Chat ❤', // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="style.css">
            <title>Email</title>
            <style>
                body{
            background-color: #e1e1e1;
            font-family: Arial, Helvetica, sans-serif;
        }
        
        .container{
          max-width: 680px;
          width: 100%;
          margin: auto;
        }
        
        main{
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            color: #555555; 
        }
        
        .body h2{
            font-weight: 300;
            color: #464646;
        }
        
        .logo{
            width: 150px;
            padding: 5px 5px;
        }
        
        .header-img{
            max-width: 100% !important;
            height: auto !important;
            width: 100%;
        }
        
        a{
            text-decoration: underline; 
            color: #0c99d5; 
        }
        
        
        .body{
            padding: 20px;
            background-color: white;
            font-family: Geneva, Tahoma, Verdana, sans-serif; 
            font-size: 16px; 
            line-height: 22px; 
            color: #555555; 
        }
        
        button{
            background-color: #0c99d5;
            border: none;
            color: white;
            border-radius: 2px;
            height: 50px;
            max-width: 250px;
           padding: 0px 30px;
            font-weight: 500;
            font-family: Geneva, Tahoma, Verdana, sans-serif; 
            font-size: 16px;
            margin: 10px 0px 30px 0px;
        }
        
        footer{
            padding-top: 50px;
            font-family: Geneva, Tahoma, Verdana, sans-serif; 
            font-size: 14px; 
            line-height: 18px; 
            color: #738597;
            text-align: center;
        }
        
        footer img{
            width: 100px;
            margin: 24px 0px;
        }
        
            </style>
        </head>
        
        <body>
            <main class="container">
                <div class="logo">
                </div>
                
                <img src="https://d26a57ydsghvgx.cloudfront.net/content/blog/BlogImage_Chat.jpg" class="header-img">
        
                <div class="body">
                    <h2>SocketIO 💖</h2>
                    <p style="line-height: 25px;">To use SocketIO realtime chat, you need to register an account. It's really important
                    <br>
                    Your username is: <strong>${username}</strong> and it's registered by this email, so you can active account by press to 'ACTIVE BUTTON' bellow.</p>
                    <a href="http://localhost:5000/users/active?verifyToken=${verifyToken}" target="_blank"><button>ACTIVE NOW</button></a>
                </div>
            </main>
            <footer class="container">
                <p>Thanks for reading!</p>
                <p>You're receiving this email because we think you’re neat, AND you subscribed to hear from us. If our emails aren’t sparking joy, we’ll understand if you  <a>unsubscribe.</a></p>
                <p>You can also <a href="#">update your email preferences</a> at anytime.</p>
                
                <div>
                    <p>Make by Trung Hieu</p>
                </div>
            </footer>
        </div>
        </body>
        </html>`, // html body
      })

    } catch (error) {
      console.log(error)
    }
  },
}
