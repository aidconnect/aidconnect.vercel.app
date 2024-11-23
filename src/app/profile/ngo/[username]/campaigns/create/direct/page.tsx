import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "./direct.module.css"
import Image from "next/image"
import Form from "./form"

export default async function createCampaign({searchParams}:{
    searchParams: {
        id: number,
        firstname: string,
        middlename: string,
        lastname: string,
        age: number,
        email: string,
        phone: number,
        wallet: string,
        country: string,
        state: string,
        district: string,
        city: string,
        pin: number
    }
}) {

    const needy = [
        {
            id: searchParams.id,
            firstname: searchParams.firstname,
            middlename: searchParams.middlename,
            lastname: searchParams.lastname,
            age: searchParams.age,
            email: searchParams.email,
            phone: searchParams.phone,
            wallet: searchParams.wallet,
            country: searchParams.country,
            state: searchParams.state,
            district: searchParams.district,
            city: searchParams.city,
            pin: searchParams.pin
        }
    ]

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
                        <h1 className={styles.text}><b>D</b>irect <b>B</b>eneficiary <b>C</b>ampaign</h1>
                    </div>
                </div>
                <div className={styles.right}>
                    <Form needy={needy}/>
                </div>
            </div>
        </>
  )
}