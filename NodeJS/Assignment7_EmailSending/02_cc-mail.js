require("dotenv").config();
const nodeMailer = require("nodemailer");

const { APP_EMAIL, APP_PASS, MAIL_TO, MAIL_CC } = process.env;

const practiseMode = !APP_EMAIL || !APP_PASS;

async function sendEmail() {
    try {
        const transporter = practiseMode ? nodeMailer.createTransport({ jsonTransport: true }) : nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: APP_EMAIL, pass: APP_PASS
            }
        });

        const mailOptions = {
            from: APP_EMAIL || "abc@gmail.com",
            to: MAIL_TO || "xyz@gmail.com",
            cc: MAIL_CC,
            subject: "Just a Little Reminder",
            html:
                `<h2>Hello!</h2>
            <p>I hope you're having a great day.</p>
            <p>This is just a small test email to practice sending emails using Node.js and Nodemailer.</p>
            <p>Hope everything is going well!</p>
            <p>Best Regards,<br>Laiba</p>`

        };
        const info = await transporter.sendMail(mailOptions);

        if (practiseMode) {
            console.log("PRACTICE MODE: ", JSON.parse(info.message));

        } else {
            console.log("Email Sent! ", info.messageId);

        }

    }
    catch (error) {
        console.log("Failed: ", error.message)
    }
}
sendEmail();

