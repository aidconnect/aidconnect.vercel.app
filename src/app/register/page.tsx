import { getServerSession } from "next-auth"
import styles from "./register.module.css"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Register() {
  const session=await getServerSession()
  if(session){
      redirect("/profile")
  }
  return (
    <>
      <div className={styles.canvas}>
        <title>GIV3R丨Register</title>
        <div className={styles.header}>
          <h1 className={styles.heading}>Register</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.high}>
              <div className={styles.circle}>
                <Link className={styles.home} href={"/"}>
                  <Image className={styles.logo} priority={true} src={"/logo.png"} width={500} height={250} alt="GIV3R"/>
                </Link>
              </div>
            </div>
            <div className={styles.low}>
              <p className={styles.log}>Already have an account?<br/><Link className={styles.link} href={"/login"}><b className={styles.in}>Login</b></Link></p>
            </div>
          </div>
          <div className={styles.mid}>
            <div className={styles.ngo}>
              <button className={styles.card}>
                <Link className={styles.link} href={"/register/ngo"}>
                  <div className={styles.top}>
                    <Image className={styles.image} priority={true} src={"/ngo.png"} width={500} height={500} alt="NGO"/>
                  </div>
                  <div className={styles.bottom}>
                    <p className={styles.text}>Are you a NGO?</p>
                  </div>
                </Link>
              </button>
            </div>
            <div className={styles.services}>
              <button className={styles.card}>
                <Link className={styles.link} href={"/register/service"}>
                  <div className={styles.top}>
                    <Image className={styles.image} priority={true} src={"/services.png"} width={500} height={500} alt="Services"/>
                  </div>
                  <div className={styles.bottom}>
                    <p className={styles.text}>Are you a Service Provider?</p>
                  </div>
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.donor}>
              <button className={styles.card}>
                <Link className={styles.link} href={"/register/donor"}>
                    <div className={styles.top}>
                      <Image className={styles.image} priority={true} src={"/donor.png"} width={500} height={500} alt="Donor"/>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.text}>Are you a Donor?</p>
                    </div>
                  </Link>
              </button>
            </div>
            <div className={styles.needy}>
              <button className={styles.card}>
                <Link className={styles.link} href={"/register/needy"}>
                    <div className={styles.top}>
                      <Image className={styles.image} priority={true} src={"/needy.png"} width={500} height={500} alt="needy"/>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.text}>Are you a Beneficiary?</p>
                    </div>
                  </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}