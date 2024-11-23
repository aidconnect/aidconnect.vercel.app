import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const donor=await sql`select * from donor where username=${session?.user?.name};`
    const donor_id=donor.rows[0].id
    const response=await sql`select * from payment where from_id=${donor_id} union select * from payment where from_id=(select to_id from payment where from_id=${donor_id} and type not in ('DB','CC')) order by id desc;`
    const data=response.rows
    return NextResponse.json({data})
}