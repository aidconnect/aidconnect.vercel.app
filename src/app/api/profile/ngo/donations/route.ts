import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const ngo=await sql`select * from ngo where username=${session?.user?.name};`
    const ngo_id=ngo.rows[0].id
    const response=await sql`select * from payment where ngo_id=${ngo_id} order by id desc;`
    const data=response.rows
    return NextResponse.json({data})
}