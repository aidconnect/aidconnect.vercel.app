import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"

export async function POST(request:Request) {
    const session=await getServerSession()
    try{
        const{id,to_id,to_name,amount,type,hash}=await request.json()
        const from_data=await sql`select * from ngo where username=${session?.user?.name};`
        const from_id=from_data.rows[0].id
        const from_name=from_data.rows[0].name
        const response=await sql`insert into payment(from_id,from_name,to_id,to_name,amount,type,campaign_id,ngo_id,hash) values(${from_id},${from_name},${to_id},${to_name},${amount},${type},${id},${from_id},${hash});`
        if(response){
            const update=await sql`update service set total=total+${amount} where id=${to_id};`
        }
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}