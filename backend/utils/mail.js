import dotenv from "dotenv"
dotenv.config({
    path:".env"
})

import mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendmail= async (options)=>{
   const mailgenrator =  new mailgen({
        theme:"default",
        product:{
            name:"Task Manager ",
            link: "https://taskmanegerlink.com"
        }
    })

    const email_Textual = mailgenrator.generatePlaintext(options.mailgencontent)
    const email_html = mailgenrator.generate(options.mailgencontent)

    // sending email 
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        // Use the environment variable for the 'from' address
        from: process.env.EMAIL_FROM,
        to: options.email,
        text: email_Textual,
        html: email_html
    }

    try {
        await transport.sendMail(mail)
    } catch (error) {
        console.log("Email service silently failed. Make sure you provide your MAILTRAP credentials properly from .env.");
        console.error("Error", error);
    }
}

const emailverificationmailgencontent = function (username, verificationUrl) {
    // ... (rest of the code is unchanged)
    return {
        body: {
            name: username,
            intro: 'Welcome to our App!! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your Email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
};

const forgotpasswordmailgencontent = function (username, passwordResetUrl) {
    // ... (rest of the code is unchanged)
    return {
        body: {
            name: username,
            intro: 'We got a request to change the password of your account',
            action: {
                instructions: 'To reset password, please refer the following button:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset your password', // Corrected text for clarity
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
};
    
export{
    emailverificationmailgencontent,
    forgotpasswordmailgencontent,
    sendmail
}