import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const service=await sql`select * from service where username=${session?.user?.name};`
    const service_id=service.rows[0].id
    const response=await sql`select * from payment where to_id=${service_id} order by id desc;`
    const data=response.rows
    return NextResponse.json({data})
}