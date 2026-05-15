import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bycryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bycryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        // Create a transporter using SMTP
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.example.com",
        //     port: 587,
        //     secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASS,
        //     },
        // });
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1eab95f341abe1", // should be in env
                pass: "c518ccc758b211" // should be in env
            }
        });

        const mailOptions = {
            from: 'shahmw488@gmail.com', // sender address
            to: email, // list of recipients
            subject: emailType === 'VERIFY' ? "Verify Your email" : "Reset your password", // subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);


    }
    catch (error: any) {
        throw new Error(error.message)
    }
}