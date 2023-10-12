//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.use(bodyParser.json()); 

app.get('/test', (req, res) => {
  const globalUser = req.body.globalUser;
  console.log(globalUser)

  // Send a response back to the Flutter app
  res.status(200).json({ message: 'Received and logged message successfully' });
});


app.post('/flutterUserMailer', (req, res) => {
    // Access the data sent from the Flutter app
    const parkingOwner = req.body.ParkingOwner;
    const parkingFine = req.body.ParkingFine;
    const bookedParking = req.body.BookedParking;
    const userEmail = req.body.UserEmail;
    const totalHoursBooked = req.body.TotalHoursBooked;

    // Process the data as needed
    console.log(`Parking Owner: ${parkingOwner}`);
    console.log(`Parking Fine: ${parkingFine}`);
    console.log(`Booked Parking: ${bookedParking}`);
    console.log(`User Email: ${userEmail}`);
    console.log(`Total Hours Booked: ${totalHoursBooked}`);

    const emailBody_forParkingOwener = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          p {
            margin-bottom: 20px;
            font-size: 800;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: rgb(26, 25, 25);
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to ParK Pro!</h1>
        <p>
          Dear ${parkingOwner},
        </p>
        <p>I hope this message finds you well. We are pleased to inform you that your parking spot at ParK Pro has been successfully booked. Your convenience is our top priority, and we are excited to welcome you to our facility.</p>
        
         <h4> Here are the details of your booking:<p>
        <ul>
        
        <li>Booked By : ${userEmail}</li>
        <li>Parking Number: R${bookedParking}.00</li>
        <li>Amount: R${parkingFine}.00</li>
        <li>Total Hours Booked: ${totalHoursBooked}</li>
    </ul>
    
    <p> If you have any questions or need further assistance, please don't hesitate to contact us at ParkPro or 079 842 7958. We're here to assist you with any inquiries or concerns.<p>
        
        Once again, thank you for choosing our parking service. We hope you have a pleasant experience!
      
        Sincerely,
        ParK Pro
      </p>
        
      </body>
    </html>
    `;
const receiver = 'ronaldnt8@gmail.com';
                const transporter_1 = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'mailapi348@gmail.com',
                    pass: 'lhhoqgnfyjfgpvvg'
                  }
                });
    
                const mailOptions_1 = {
                  from: 'mailapi348@gmail.com',
                 to: receiver,
                  subject: 'Park Pro Bookings',
                  html: emailBody_forParkingOwener
                };
    
                transporter_1.sendMail(mailOptions_1, (error, info) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log(`Email sent to ${ receiver}`);
                  }
                });


    const emailBody = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          p {
            margin-bottom: 20px;
            font-size: 800;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: rgb(26, 25, 25);
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to ParK Pro!</h1>
        <p>
          Dear ${userEmail},
        </p>
        <p>Thank you for booking a parking spot with us! We appreciate your business and look forward to providing you with a convenient and safe parking experience.</p>
        
         <h4> Here are the details of your booking:<p>
        <ul>
        
        <li>Booked Parking Spot: ${bookedParking}</li>
        <li>Total Hours Booked: ${totalHoursBooked}</li>
        <li>Parking Fine: R${parkingFine}.00</li>
    </ul>
        
    <p>Your booking has been confirmed, and you can proceed to your reserved parking spot with confidence.<p>
        
    <p> If you have any questions or need further assistance, please don't hesitate to contact us at ParkPro or 079 842 7958. We're here to assist you with any inquiries or concerns.<p>
        
        Once again, thank you for choosing our parking service. We hope you have a pleasant experience!
      
        Sincerely,
        ParK Pro
    
      </p>
        
     
      </body>
    </html>
    `;
    const ron = "ronaldnt8@gmail.com"
                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'mailapi348@gmail.com',
                    pass: 'lhhoqgnfyjfgpvvg'
                  }
                });
    
                const mailOptions = {
                  from: 'mailapi348@gmail.com',
                 to: ron,
                
                  subject: 'Park Pro Bookings',
                  html: emailBody
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log(`Email sent to ${ron}`);
                  }
                });

    res.status(200).send('Data received successfully'); // Send a response to the Flutter app
  });
  


app.listen(process.env.PORT || port, ()=> console.log(`Listening on port ${port}`))

