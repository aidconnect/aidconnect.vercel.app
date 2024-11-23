import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export async function POST(request:Request) {
    try{
        const{name,email,phone,message}=await request.json()
        const transporter=nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions={
            from: email,
            to: "giv3r.vercel.app@gmail.com",
            subject: "GIV3R丨Feedback",
            html: `
                <h1>Feedback received from ${name}</h1>
                <br>
                <p>${message}</p>
                <br>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
            `
        }

        await transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}