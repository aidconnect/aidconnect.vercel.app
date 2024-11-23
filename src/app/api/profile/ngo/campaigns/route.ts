import { sql } from "@vercel/postgres"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(){
    const session=await getServerSession()
    const ngo=await sql`select * from ngo where username=${session?.user?.name};`
    const ngo_id=ngo.rows[0].id
    const response=await sql`select * from campaign where ngo_id=${ngo_id} and status='Active';`
    const data=response.rows
    return NextResponse.json({data})
}

export async function POST(request:Request) {
    try{
        const session=await getServerSession()
        const{id,type,name,cause,amount,needy,address,age,email,phone,wallet}=await request.json()
        if(type==='DB'){
            const ngo=await sql`select * from ngo where username=${session?.user?.name};`
            if(ngo){
                const ngo_id=ngo.rows[0].id
                const ngo_name=ngo.rows[0].name
                const response=await sql`insert into campaign(id,type,name,cause,target,ngo_id,ngo_name,to_name,address,age,email,phone,wallet,status) values(${id},'DB',${name},${cause},${amount},${ngo_id},${ngo_name},${needy},${address},${age},${email},${phone},${wallet},'Active');`
                if(response){
                    const update=await sql`update ngo set campaigns=campaigns+1 where username=${session?.user?.name};`
                    const approve=await sql`update needy set status='Approved' where ngo=${ngo_id};`
                    const needyUser=await sql`select * from needy where ngo=${ngo_id};`
                    const needyUsername=needyUser.rows[0].username
                    const del=await sql`delete from needy where username=${needyUsername} and status='Pending';`
                }
            }
        }
        else{
            const ngo=await sql`select * from ngo where username=${session?.user?.name};`
            if(ngo){
                const ngo_id=ngo.rows[0].id
                const ngo_name=ngo.rows[0].name
                const ngo_country=ngo.rows[0].country
                const ngo_state=ngo.rows[0].state
                const ngo_district=ngo.rows[0].district
                const ngo_city=ngo.rows[0].city
                const ngo_pin=ngo.rows[0].pin
                const ngo_address=`${ngo_city}, ${ngo_district}, ${ngo_state}, ${ngo_country} -${ngo_pin}`
                const ngo_email=ngo.rows[0].email
                const ngo_phone=ngo.rows[0].phone
                const ngo_wallet=ngo.rows[0].wallet
                const response=await sql`insert into campaign(id,type,name,cause,volunteers,target,ngo_id,ngo_name,to_name,address,email,phone,wallet,status) values(${id},'CC',${name},${cause},${needy},${amount},${ngo_id},${ngo_name},${ngo_name},${ngo_address},${ngo_email},${ngo_phone},${ngo_wallet},'Active');`
                if(response){
                    const update=await sql`update ngo set campaigns=campaigns+1 where username=${session?.user?.name};`
                    const volunteer=await sql`update ngo set volunteers=volunteers+${needy} where username=${session?.user?.name};`
                }
            }
        }
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({response:"success"})
}