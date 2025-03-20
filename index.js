const express    = require("express");
const nodeMailer  = require("nodemailer");
const bodyParser  = require("body-Parser");
const favicon    = require('serve-favicon');
const port = process.env.PORT || 3000;
        const app = express();

        app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('landscaper')); 

app.use(favicon(__dirname + '/landscaper/img/favicon.png'));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/landscaper/index.html');
  });

  app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;


  const transporter = nodeMailer.createTransport({
    service: 'your-email-service',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });


  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient@example.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error.message);
    }
    console.log('Email sent: ', info.response);
  });

  res.send('Form submitted successfully!');
});
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
