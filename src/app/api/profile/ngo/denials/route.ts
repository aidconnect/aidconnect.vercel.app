import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
    try{
        const session=await getServerSession()
        const{username}=await request.json()
        if(session || !session){
            const response=await sql`delete from needy where username=${username};`
        }
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}