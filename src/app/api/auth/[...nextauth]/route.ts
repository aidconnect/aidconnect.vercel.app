import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { sql } from "@vercel/postgres"

const handler = NextAuth({
    session:{
        strategy: "jwt"
    },
    providers: [CredentialsProvider({
        credentials: {
            category: {},
            username: {},
            password: {}
          },
          async authorize (credentials, req) {
            if(credentials?.category==="NGO"){
                const response=await sql`select * from ngo where username=${credentials?.username};`
                const ngo=response.rows[0]
                const passwordCheck=await compare(credentials?.password || "",ngo.password)
                if(passwordCheck){
                    return{
                        id: ngo.id,
                        name: ngo.username,
                        email: "N",
                        image: ngo.wallet
                    }
                }
            }
            else if(credentials?.category==="Donor"){
                const response=await sql`select * from donor where username=${credentials?.username};`
                const donor=response.rows[0]
                const passwordCheck=await compare(credentials?.password || "",donor.password)
                if(passwordCheck){
                    return{
                        id: donor.id,
                        name: donor.username,
                        email: "D",
                        image: donor.wallet
                    }
                }
            }
            else if(credentials?.category==="Beneficiary"){
                const response=await sql`select * from needy where username=${credentials.username};`
                const needy=response.rows[0]
                const passwordCheck=await compare(credentials.password || "",needy.password)
                if(passwordCheck){
                    return{
                        id: needy.id,
                        name: needy.username,
                        email: "B",
                        image: needy.wallet
                    }
                }
            }
            else if(credentials?.category==="Service Provider"){
                const response=await sql`select * from service where username=${credentials.username};`
                const service=response.rows[0]
                const passwordCheck=await compare(credentials.password || "",service.password)
                if(passwordCheck){
                    return{
                        id: service.id,
                        name: service.username,
                        email: "S",
                        image: service.wallet
                    }
                }
            }
            return null
          }
    })]
})

export { handler as GET,handler as POST }