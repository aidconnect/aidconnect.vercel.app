import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Profile() {
    const session=await getServerSession()
    if(session){
        if(session.user?.email==="N"){
            redirect(`/profile/ngo/${session.user.name}/dashboard`)
        }
        else if(session.user?.email==="D"){
            redirect(`/profile/donor/${session.user.name}/dashboard`)
        }
        else if(session.user?.email==="B"){
            redirect(`/profile/needy/${session.user.name}/dashboard`)
        }
        else if(session.user?.email==="S"){
            redirect(`/profile/service/${session.user.name}/dashboard`)
        }
    }
    else{
        redirect("/login")
    }
    return(
        <>
            <title>GIV3R丨Profile</title>
        </>
    )
}
