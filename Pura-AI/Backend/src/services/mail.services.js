// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.GOOGLE_USER,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//   },
// });

// transporter
//   .verify()
//   .then(() => {
//     console.log("Email transporter is ready to send emails");
//   })
//   .catch((err) => {
//     console.error("Email transporter verification failed:", err);
//   });

// export async function sendEmail({ to, subject, html, text }) {
//   const mailOptions = {
//     from: process.env.GOOGLE_USER,
//     to,
//     subject,
//     html,
//     text,
//   };

//   try {
//     const details = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", details.response);
//     return details;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error(`Email sending failed: ${error.message}`);
//   }
// }
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Brevo SMTP Ready ✅");
  })
  .catch((err) => {
    console.error(err);
  });

export async function sendEmail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}