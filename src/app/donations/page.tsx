import styles from "./donations.module.css"
import Image from "next/image"
import DonationsPage from "./donations"
import Link from "next/link"

export default async function Campaigns(){
    return(
        <>
            <div className={styles.canvas}>
                <title>GIV3R丨Campaigns</title>
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
                        <h1>Donations</h1>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <DonationsPage/>
                </div>
            </div>
        </>
    )
}