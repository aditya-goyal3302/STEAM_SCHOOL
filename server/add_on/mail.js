const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',  
  secure: false,
  port: 587,
  auth: {
      user: "agdoietest@hotmail.com",
      pass: "Acbd@123"
  }
});

function WelcomeMail(mailto, usrnm) {
  var mailOptions = {
    from: "agdoietest@hotmail.com",
    to: mailto,
    subject: "Welcome to Steam School",
    html:`<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                /* background-color: #fff; */
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
                border-radius: 5px;
                ;
                box-shadow: 0 2px 5px #ccc;
            }
            p{
                text-align: justify;
                font-size: 16px;
                color: #666;
            }
        </style>
        <title>Welcome to Stream School</title>
    </head>
    <body class="container">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4" style="background-color: #f4f4f4;margin: 0%; padding: 0%;">
            <tr>
                <td align="center">
                    <tr width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; margin: 20px 0; border-radius: 10px; box-shadow: 0 2px 5px #ccc;">
                        <tr>
                            <td align="center" style="padding: 40px 0;">
                                <img src="https://steamschool199.s3.ap-south-1.amazonaws.com/Logo.png" alt="[Education Website Name] Logo" style="max-width: 350px;">
                            </td>
                        </tr>
                        <tr>
                            <td align="center"><h1>Welcome to Stream School</h1></td>
    
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: justify;font-size: x-small;">
                                <p>Dear ${usrnm},</p> 
                                <div style="margin-left: 30px;">
                                    <p>We are thrilled to welcome you Stream School. Your quest for knowledge and learning has brought you to our platform, and we're committed to providing you with an enriching and engaging educational experience. Whether you're a student, teacher, parent, or lifelong learner, we're here to support your educational journey.</p>
                                    <p>We're dedicated to helping you achieve your educational goals, whether that means acing your exams, gaining new skills, or simply satisfying your curiosity. If you have any questions or encounter any issues, don't hesitate to reach out to our support team at [Support Email Address].</p>
                                    <p>Thank you for choosing Stream School as your learning platform. We're excited to be part of your educational journey.</p>
                                    <p>Happy learning!</p>
                                    <p>Best regards,</p>
                                    <p><a href="http://localhost:3000">Stream School</a></p>
                                </div>
                            </td>
                        </tr>
                    </tr>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
      
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info);
    }
  });
}

function otpmail(mailto, usrnm, otp) {
  var mailOptions = {
    from: "agdoietest@hotmail.com",
    to: mailto,
    subject: "OTP FOR LOGIN",
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 500px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px #ccc;
            }
    
            h1 {
                color: #333;
            }
    
            p {
                font-size: 16px;
                color: #666;
                text-align: justify;
            }
    
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #0070c9;
            }
    
            .contact {
                font-size: 14px;
                color: #777;
            }
    
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://steamschool199.s3.ap-south-1.amazonaws.com/Logo.png" alt="[Education Website Name] Logo" style="max-width: 350px;">
    
            <h1>Your One-Time Password (OTP) for Stream School</h1>
            <p>Dear ${usrnm},</p>
            <div style="margin-left: 30px;font-size: x-small;">
                <p>Thank you for choosing Stream School as your trusted platform. To ensure the security of your account, we have generated a one-time password (OTP) for you to complete your registration or sign-in process.</p>
                <p>Your OTP is: <span class="otp">[ S-${otp}]</span></p>
                <p>Please use this OTP to verify your identity and complete the required action on our website. It is crucial to keep your OTP confidential and not share it with anyone, as it is a critical security measure.</p>
                <p>If you did not request this OTP or have any concerns about the security of your account, please contact our support team immediately at [Support Email Address] or [Support Phone Number].</p>
                <p>Thank you for choosing Stream School. We take your security seriously and look forward to serving you.</p>
                <p class="contact">Best regards,
                    <br>Sttream School
                    <br><a href="http://localhost:3000">Stream School</a>
            </div>
        </div>
    </body>
    </html>
    `};
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(1);
    } else {
      console.log("Email sent: " + info);
    }
  });
}

function resetMail(mailto, usrnm,token){
    var mailOptions = {
      from: "agdoietest@hotmail.com",
      to: mailto,
      subject: "Reset Password Link",
      html:`<!DOCTYPE html>
      <html lang="en">
      <head>
          
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              /* CSS for styling the email */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
                  margin: 0;
                  padding: 0;
                  text-align: center;
              }
              .container {
                  max-width: 500px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  text-align: left;
                  color: #777;
                  text-align: justify;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <img src="https://steamschool199.s3.ap-south-1.amazonaws.com/Logo.png" alt="[Education Website Name] Logo" style="max-width: 350px;">
              <h1>Reset Password Link</h1>
              <p>Dear ${usrnm},</p>
              <div style="margin-left: 30px; ">
                  <p>
                      We received a request to reset the password associated with this email address for your Steam School account. If you made this request, please follow the instructions below.
                      <br>
  
                      To reset your password, click on the following link:
                      <br>
                      <a href="http://localhost:3000/login/setpass/?token=${token}">Reset Password</a>
  
                      If you did not request a password reset, please ignore this email. Your account is secure, and no changes have been made.
                      <br>
                      The link above will expire in [insert time limit, e.g., 24 hours], so be sure to use it as soon as possible.
                      <br>
                      If you encounter any issues or did not request this password reset, please contact our support team at <a href="http://localhost:3000">Stream School</a>.
                      <br>
                      Thank you,
                      <br>
                      The Steam School Team
                  </p>
                  <p>Sincerely, <br>
                      <p></p>
                  </p>
              </div>
          </div>
      </body>
    </html>
  
      `
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(1);
      } else {
        console.log("Email sent: " + info);
      }
    });
  }

function loginMail(mailto, usrnm){
  var mailOptions = {
    from: "agdoietest@hotmail.com",
    to: mailto,
    subject: "Login Successful",
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* CSS for styling the email */
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                text-align: left;
                color: #777;
                text-align: justify;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://steamschool199.s3.ap-south-1.amazonaws.com/Logo.png" alt="[Education Website Name] Logo" style="max-width: 350px;">
            <h1>Login Successful</h1>
            <p>Dear ${usrnm},</p>
            <div style="margin-left: 30px; ">
                <p>We are thrilled to confirm that your login to our educational platform was successful! You are now a valued member of our learning community.</p>
                <p>At Steam School, we are committed to providing you with a world-class learning experience. Whether you're here to acquire new skills, expand your knowledge, or enhance your career, we have a wide range of courses and resources waiting for you.</p>
                <p>To get started, simply log in to your account and explore the incredible learning opportunities that await you. Should you have any questions or need assistance, our support team is here to help.</p>
                <p>Thank you for choosing Steam School for your learning journey. We look forward to accompanying you on your path to success. <br><br>Happy learning!</p>
                <p>Sincerely, <br>
                    <p><a href="http://localhost:3000">Stream School</a></p>
                </p>
            </div>
        </div>
    </body>
    </html>
    `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(1);
    } else {
      console.log("Email sent: " + info);
    }
  });
}

module.exports = { WelcomeMail, otpmail , loginMail, resetMail };
