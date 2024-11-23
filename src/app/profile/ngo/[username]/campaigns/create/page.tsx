import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "./create.module.css"
import Image from "next/image"
import Form from "./form"

export default async function createCampaign() {
    const session=await getServerSession()
    if(session){
        if(session.user?.email==="D"){
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
            <div className={styles.canvas}>
                <div className={styles.left}>
                    <div className={styles.up}>
                        <div className={styles.circle}>
                            <Image className={styles.logo} priority={true} src={"/logo.png"} width={300} height={150} alt="GIV3R"/>
                        </div>
                    </div>
                    <div className={styles.down}>
                        <h1 className={styles.text}><b>C</b>ommunity <b>C</b>ampaign</h1>
                    </div>
                </div>
                <div className={styles.right}>
                    <Form session={session.user?.image || ''}/>
                </div>
            </div>
        </>
  )
}