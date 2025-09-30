
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    port: Number(process.env.SMTP_PORT),
    host: process.env.SMTP_HOST,
});

interface sendEmailOptions {
    to: string;
    subject: string;
    templateName: string; 
    templateData?: Record<string, any>; 
}

export const sendEmail = async ({ to, subject, templateName, templateData }: sendEmailOptions) => {
    try {
        const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
        console.log("Template path:", templatePath);

        const html = await ejs.renderFile(templatePath, templateData);

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
        });

        console.log(`Email sent to ${to}: ${info.messageId}`);
    } catch (error: any) {
        console.log("Email sending error:", error.message);
        throw new Error("Email sending failed");
    }
};
