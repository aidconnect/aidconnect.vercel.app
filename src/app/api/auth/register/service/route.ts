import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { sql } from "@vercel/postgres"

export async function POST(request:Request) {
    try{
        const{name,service,email,phone,country,state,district,city,pin,wallet,username,password}=await request.json()
        const hashedPassword=await hash(password,10)
        const response=await sql`insert into service(name,service,email,phone,country,state,district,city,pin,wallet,username,password) values(${name},${service},${email},${phone},${country},${state},${district},${city},${pin},${wallet},${username},${hashedPassword});`
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}