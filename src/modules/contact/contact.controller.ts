import { Request, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";


const sendContactEmail = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required",
            });
        }

        if (!process.env.SMTP_USER) {
            return res.status(500).json({
                success: false,
                message: "Receiver email is not configured",
            });
        }

        await sendEmail({
            to: process.env.SMTP_USER,
            subject: `New Contact Request from ${name}`,
            templateName: "contact-owner",
            templateData: { name, email, phone, message },
        });

        await sendEmail({
            to: email,
            subject: "Thank you for contacting!",
            templateName: "contact-user",
            templateData: { name, email, message },
        });

        res.status(200).json({
            success: true,
            message: "Emails sent successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};


export const ContactController = {
    sendContactEmail,
};
