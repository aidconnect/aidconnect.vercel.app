import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    let data
    if(session || !session){
        const response=await sql`select * from service;`
        data=response.rows
    }
    return NextResponse.json({data})
}