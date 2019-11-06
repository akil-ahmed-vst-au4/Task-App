const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "callmesiddique@gmail.com",
    subject: "Thanks for joining us",
    text: `Welcome to the app, ${name}. You are feed back is important to us`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "callmesiddique@gmail.com",
    subject: "We are sorry to see you go",
    text: `Please tell us your reason for leaving ${name}, Your feedback is really important to us`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
