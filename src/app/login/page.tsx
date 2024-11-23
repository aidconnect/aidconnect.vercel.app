import { getServerSession } from "next-auth"
import Form from "./form"
import styles from "./login.module.css"
import Image from "next/image"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Login() {
    const session=await getServerSession()
    if(session){
        redirect("/profile")
    }
    return(
        <>
            <title>GIV3R丨Login</title>
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
                        <div className={styles.login}>
                            <h1 className={styles.title}>Login</h1>
                        </div>
                        <div className={styles.register}>
                            <p className={styles.subtitle}>Don&apos;t have an account? <b><Link className={styles.link} href={"/register"}>Register</Link></b></p>
                        </div>
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