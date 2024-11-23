import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export async function POST(request:Request) {
    try{
        const{id,type,from,to,left,amount,hash}=await request.json()
        if(type==='DB'){
            const to_data=await sql`select * from needy where wallet=${to};`
            const to_id=to_data.rows[0].id
            const to_firstname=to_data.rows[0].firstname
            const to_middlename=to_data.rows[0].middlename
            const to_lastname=to_data.rows[0].lastname
            const to_name=`${to_firstname} ${to_middlename} ${to_lastname}`
            const from_data=await sql`select * from donor where wallet=${from};`
            const from_id=from_data.rows[0].id
            const from_firstname=from_data.rows[0].firstname
            const from_middlename=from_data.rows[0].middlename
            const from_lastname=from_data.rows[0].lastname
            const from_name=`${from_firstname} ${from_middlename} ${from_lastname}`
            const ngo=await sql`select * from campaign where id=${id};`
            const ngo_id=ngo.rows[0].ngo_id
            const response=await sql`insert into payment(from_id,from_name,to_id,to_name,amount,type,campaign_id,ngo_id,hash) values(${from_id},${from_name},${to_id},${to_name},${amount},${type},${id},${ngo_id},${hash});`
            if(response){
                const campaign=await sql`select * from campaign where id=${id};`
                const campaign_target=campaign.rows[0].target
                const update=await sql`update campaign set raised=raised+${amount} where id=${id};`
                const raise=await sql`select * from campaign where id=${id};`
                const raised=raise.rows[0].raised
                if(raised>=campaign_target){
                    const complete=await sql`update campaign set status='Complete' where id=${id};`

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

                    const getTheEmail=await sql`select * from needy where id=${to_id}`
                    const theEmail=getTheEmail.rows[0].email
            
                    const mailOptions={
                        from: "giv3r.vercel.app@gmail.com",
                        to: theEmail,
                        subject: "Congratulations! Your Campaign Has Reached Its Target Amount",
                        html: `
                                <p>Dear ${to_name},</p>
                                <br>
                                <p>We are delighted to share some wonderful news with you today! Your campaign on our decentralized charity portal has successfully reached its target amount. We are immensely proud of your dedication and the incredible support you have received from donors who believe in your cause.</p>
                                <br>
                                <p> As a result of this achievement, we are thrilled to inform you that the specified target amount has been transferred to your wallet. This funding will enable you to continue your vital work and make a meaningful impact in the lives of those you serve.</p>
                                <br>
                                <p>If you have any questions or would like further information, please don't hesitate to contact us.</p>
                                <br>
                                <p>Warm regards,</p>
                                <p>Team GIV3R</p>
                        `
                    }
            
                    await transporter.sendMail(mailOptions)
                }
                const total=await sql`update donor set total=total+${amount} where id=${from_id};`
                const number=await sql`update donor set number=number+1 where id=${from_id};`
            }

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

            const getEmail=await sql`select * from needy where id=${to_id}`
            const email=getEmail.rows[0].email
    
            const mailOptions={
                from: "giv3r.vercel.app@gmail.com",
                to: email,
                subject: "You've Received a Donation",
                html: `
                    <p>Dear ${to_name},</p>
                    <br>
                    <p>We are thrilled to inform you that a generous donation has been made in your name. The donation comes from a compassionate individual who believes in your mission and wants to contribute to making a positive difference in the lives of those you serve.</p>
                    <br>
                    <p> We are pleased to share the details of the donation with you:</p>
                    <p>Name: ${from_name}</p>
                    <p>Amount Donated: ${amount} ETH</p>
                    <br>
                    <p>If you have any questions or would like further information, please don't hesitate to contact us.</p>
                    <br>
                    <p>Warm regards,</p>
                    <p>Team GIV3R</p>
                `
            }
    
            await transporter.sendMail(mailOptions)
        }
        else{
            const to_data=await sql`select * from ngo where wallet=${to};`
            const to_id=to_data.rows[0].id
            const to_name=to_data.rows[0].name
            const from_data=await sql`select * from donor where wallet=${from};`
            const from_id=from_data.rows[0].id
            const from_firstname=from_data.rows[0].firstname
            const from_middlename=from_data.rows[0].middlename
            const from_lastname=from_data.rows[0].lastname
            const from_name=`${from_firstname} ${from_middlename} ${from_lastname}`
            const ngo=await sql`select * from campaign where id=${id};`
            const ngo_id=ngo.rows[0].ngo_id
            const response=await sql`insert into payment(from_id,from_name,to_id,to_name,amount,type,campaign_id,ngo_id,hash) values(${from_id},${from_name},${to_id},${to_name},${amount},${type},${id},${ngo_id},${hash});`
            if(response){
                const campaign=await sql`select * from campaign where id=${id};`
                const campaign_target=campaign.rows[0].target
                const update=await sql`update campaign set raised=raised+${amount} where id=${id};`
                const raise=await sql`select * from campaign where id=${id};`
                const raised=raise.rows[0].raised
                if(raised>=campaign_target){
                    const complete=await sql`update campaign set status='Complete' where id=${id};`
                    
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

                    const getTheEmail=await sql`select * from ngo where id=${to_id}`
                    const theEmail=getTheEmail.rows[0].email
            
                    const mailOptions={
                        from: "giv3r.vercel.app@gmail.com",
                        to: theEmail,
                        subject: "Congratulations! Your Campaign Has Reached Its Target Amount",
                        html: `
                                <p>Dear ${to_name},</p>
                                <br>
                                <p>We are delighted to share some wonderful news with you today! Your campaign on our decentralized charity portal has successfully reached its target amount. We are immensely proud of your dedication and the incredible support you have received from donors who believe in your cause.</p>
                                <br>
                                <p> As a result of this achievement, we are thrilled to inform you that the specified target amount has been transferred to your wallet. This funding will enable you to continue your vital work and make a meaningful impact in the lives of those you serve.</p>
                                <br>
                                <p>If you have any questions or would like further information, please don't hesitate to contact us.</p>
                                <br>
                                <p>Warm regards,</p>
                                <p>Team GIV3R</p>
                        `
                    }
            
                    await transporter.sendMail(mailOptions)
                }
                const total=await sql`update donor set total=total+${amount} where id=${from_id};`
                const number=await sql`update donor set number=number+1 where id=${from_id};`
            }

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

            const getEmail=await sql`select * from ngo where id=${to_id}`
            const email=getEmail.rows[0].email
    
            const mailOptions={
                from: "giv3r.vercel.app@gmail.com",
                to: email,
                subject: "You've Received a Donation",
                html: `
                    <p>Dear ${to_name},</p>
                    <br>
                    <p>We are thrilled to inform you that a generous donation has been made in your name. The donation comes from a compassionate individual who believes in your mission and wants to contribute to making a positive difference in the lives of those you serve.</p>
                    <br>
                    <p> We are pleased to share the details of the donation with you:</p>
                    <p>Name: ${from_name}</p>
                    <p>Amount Donated: ${amount} ETH</p>
                    <br>
                    <p>If you have any questions or would like further information, please don't hesitate to contact us.</p>
                    <br>
                    <p>Warm regards,</p>
                    <p>Team GIV3R</p>
                `
            }
    
            await transporter.sendMail(mailOptions)
        }
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}