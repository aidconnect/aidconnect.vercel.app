import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const ngo=await sql`select * from ngo where username=${session?.user?.name};`
    const ngo_id=ngo.rows[0].id
    const ngo_name=ngo.rows[0].name
    const response=await sql`select * from payment where to_id=${ngo_id} and to_name=${ngo_name} limit 10;`
    const data=response.rows
    return NextResponse.json({data})
}