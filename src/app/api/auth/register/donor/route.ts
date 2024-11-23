import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { sql } from "@vercel/postgres"

export async function POST(request:Request) {
    try{
        const{firstname,middlename,lastname,age,email,phone,wallet,username,password}=await request.json()
        const hashedPassword=await hash(password,10)
        const response=await sql`insert into donor(firstname,middlename,lastname,age,email,phone,wallet,username,password) values(${firstname},${middlename},${lastname},${age},${email},${phone},${wallet},${username},${hashedPassword});`
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}