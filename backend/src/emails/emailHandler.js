import { Resend } from "resend";
import "dotenv/config";
import { createWelcomeEmailTemplate } from "./emailTempelate.js";

const resendClient = new Resend(process.env.RESEND_API_KEY);

const sender = {
    email: process.env.SENDER_EMAIL,
    name: process.env.SENDER_NAME
}

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.email} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name, clientURL),//email tempelate 
    })

    if (error) {
        console.error("Error sending welcome email:", error);
    }

    console.log("Welcome Email sent successfully", data);

}