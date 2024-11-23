import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const response=await sql`select * from donor where username=${session?.user?.name};`
    const data=response.rows[0]
    return NextResponse.json({data})
}