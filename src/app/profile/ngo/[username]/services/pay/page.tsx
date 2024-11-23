import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "./pay.module.css"
import Image from "next/image"
import Form from "./form"
import Link from "next/link"

export default async function pay({searchParams}:{
    searchParams: {
        id: number,
        name: string,
        email: string,
        phone: number,
        address: string,
        wallet: string,
        service: string
    }
}){
    const session=await getServerSession()
    const details = [
        {
            id: searchParams.id,
            name: searchParams.name,
            email: searchParams.email,
            phone: searchParams.phone,
            address: searchParams.address,
            service: searchParams.service,
            from: session?.user?.image,
            to: searchParams.wallet
        }
    ]

    if(!session){
        redirect('/login')
    }
    else if(session.user?.email==='D'){
        redirect(`/profile/donor/${session.user.name}/dashboard`)
    }
    else if(session.user?.email==='B'){
        redirect(`/profile/needy/${session.user.name}/dashboard`)
    }
    else if(session.user?.email==='S'){
        redirect(`/profile/service/${session.user.name}/dashboard`)
    }

    return(
        <>
            <div className={styles.canvas}>
                <title>GIV3R丨Profile</title>
                <div className={styles.top}>
                    <div className={styles.one}>
                        <div className={styles.circle}>
                            <Link className={styles.home} href={"/"}>
                                <Image className={styles.logo} priority={true} src={"/logo.png"} width={500} height={250} alt="GIV3R"/>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.two}></div>
                    <div className={styles.three}>
                        <h1>Services</h1>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Form details={details}/>
                </div>
            </div>
        </>
    )
}