import styles from "./ngo.module.css"
import Image from "next/image"
import Form from "./form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Register() {
    const session=await getServerSession()
    if(session){
        redirect("/profile")
    }
    return (
        <>
            <title>GIV3R丨Register</title>
            <div className={styles.canvas}>
                <div className={styles.left}>
                    <div className={styles.bar}></div>
                    <div className={styles.circle}>
                        <Link className={styles.home} href={"/"}>
                            <Image className={styles.logo} priority={true} src={"/logo.png"} width={500} height={250} alt="GIV3R"/>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <h1 className={styles.title}>Enter your details</h1>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.details}>
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}