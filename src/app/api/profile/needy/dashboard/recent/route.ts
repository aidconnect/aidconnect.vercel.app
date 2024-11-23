import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const needy=await sql`select * from needy where username=${session?.user?.name};`
    const needy_id=needy.rows[0].id
    const response=await sql`select * from payment where to_id=${needy_id} limit 10;`
    const data=response.rows
    return NextResponse.json({data})
}