import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const username=await sql`select * from ngo where username=${session?.user?.name};`
    const ngo_id=username.rows[0].id
    const response=await sql`select * from needy where ngo=${ngo_id} and status='Pending';`
    const data=response.rows
    return NextResponse.json({data})
}
