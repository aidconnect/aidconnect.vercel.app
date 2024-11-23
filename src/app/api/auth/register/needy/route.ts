import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { hash } from "bcrypt"

export async function GET(){
    const response=await sql`select * from ngo`
    const data=response.rows
    return NextResponse.json({data})
}

export async function POST(request:Request) {
    try{
        const{ngo,firstname,middlename,lastname,age,email,phone,country,state,district,city,pin,wallet,username,password}=await request.json()
        const checkUnique=await sql`select username from needy`
        let usernameExists = false
        if(checkUnique){
            for (let row of checkUnique.rows){
                if(row.username===username){
                    usernameExists=true
                    break
                }
            }
        }
        if(!usernameExists){
            const ngos=ngo.map((str: string) => parseInt(str, 10))
            const hashedPassword=await hash(password,10)
            for (let i=0;i<ngos.length;i++){
                const response=await sql`insert into needy(ngo,firstname,middlename,lastname,age,email,phone,country,state,district,city,pin,wallet,username,password) values(${ngos[i]},${firstname},${middlename},${lastname},${age},${email},${phone},${country},${state},${district},${city},${pin},${wallet},${username},${hashedPassword});`
            }
        }
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}