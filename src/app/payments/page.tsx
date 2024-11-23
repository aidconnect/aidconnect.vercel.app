import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "./payments.module.css"
import Image from "next/image"
import Form from "./form"
import Link from "next/link"

export default async function pay({searchParams}:{
    searchParams: {
        id: number,
        type: string,
        wallet: string,
        balance: number
    }
}){
    const session=await getServerSession()
    const details = [
        {
            id: searchParams.id,
            type: searchParams.type,
            from: session?.user?.image,
            to: searchParams.wallet,
            left: searchParams.balance
        }
    ]

    if(!session){
        redirect('/login')
    }

    else if(session.user?.email==='N' || session.user?.email==='B' || session.user?.email==='S'){
        alert("You are not a registered donor!")
        redirect('/campaigns')
    }

    return(
        <>
            <div className={styles.canvas}>
                <title>GIV3R丨Payments</title>
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
                        <h1>Payments</h1>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Form details={details}/>
                </div>
            </div>
        </>
    )
}