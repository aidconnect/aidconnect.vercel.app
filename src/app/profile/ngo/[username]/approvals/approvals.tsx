"use client"
import React, { useState, useEffect } from 'react'
import styles from "./approvals.module.css"
import Image from "next/image"
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation"

interface ApiResponse {
  data: {
    map(arg0: (needy: any,index: number) => React.JSX.Element): React.ReactNode
    id: number,
    username: string,
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
}

export default function Approvals({ session }: { session: string }) {
  const router=useRouter()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function handleDeny(user: string){
  const response=await fetch("/api/profile/ngo/denials",{
    method:"POST",
    body: JSON.stringify({
        username: user
    })
  })
  if(response){
      router.push("/profile")
      router.refresh()
  }}

  useEffect(() => {
    fetch("/api/profile/ngo/approvals")
      .then((res) => res.json())
      .then((apiData: ApiResponse) => {
        setData(apiData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError("An error occurred while fetching data.")
        setLoading(false);
      })
  }, [])

  if (isLoading){
    return (
      <>
        <div className={styles.canvas}>
          <div className={styles.above}>
            <Image className={styles.loading} priority={true} src={"/loading.png"} width={300} height={300} alt="Loading"/>
          </div>
          <div className={styles.below}>
            <h1>Loading...</h1>
          </div>
        </div>
      </>
    )
  }

  if (error){
    return (
      <>
        <div className={styles.canvas}>
          <div className={styles.above}>
            <Image className={styles.error} priority={true} src={"/error.png"} width={300} height={300} alt="Error"/>
          </div>
          <div className={styles.below}>
            <h1>Error loading profile!</h1>
          </div>
        </div>
      </>
    )
  }

  if (!data){
    return (
      <>
        <div className={styles.canvas}>
          <div className={styles.above}>
            <Image className={styles.missing} priority={true} src={"/missing.png"} width={300} height={300} alt="Missing"/>
          </div>
          <div className={styles.below}>
            <h1>No profile data.</h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.canvas}>
        <div className={styles.bar}>
          <div className={styles.one}>
            <Link className={styles.link} href={"/"}>
              <Image className={styles.logo} priority={true} src={"/logo.png"} width={300} height={150} alt="GIV3R"/>
            </Link>
          </div>
          <div className={styles.two}>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/ngo/${session}/dashboard`}>
                <button className={styles.button}>Dashboard</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/ngo/${session}/donations`}>
                <button className={styles.button}>Donations</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/ngo/${session}/campaigns`}>
                <button className={styles.button}>Campaigns</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`profile/ngo/${session}/approvals`}>
                <button className={styles.active}>Approvals</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/ngo/${session}/services`}>
                <button className={styles.button}>Services</button>
              </Link>
            </div>
          </div>
          <div className={styles.three}>
            <button className={styles.logout} onClick={()=>{signOut()}}>Logout</button>
          </div>
        </div>
        <div className={styles.approvals}>
            <div className={styles.top}>
                <h1 className={styles.title}>Pending Approvals</h1>
            </div>
            <div className={styles.bottom}>
            <div className={styles.flex}>
                {data.data.map((needy: any,index: number) => (
                    <div key={index} className={styles.pending}>
                        <div className={styles.list}>
                            <div className={styles.request}>
                                <p>{needy.firstname} {needy.middlename} {needy.lastname} has requested for approval</p>
                            </div>
                            <div className={styles.approval}>
                              <Link className={styles.approve} href={{
                                pathname: `/profile/ngo/${session}/campaigns/create/direct`,
                                query: {
                                  id: needy.id,
                                  firstname: needy.firstname,
                                  middlename: needy.middlename,
                                  lastname: needy.lastname,
                                  age: needy.age,
                                  email: needy.email,
                                  phone: needy.phone,
                                  wallet: needy.wallet,
                                  country: needy.country,
                                  state: needy.state,
                                  district: needy.district,
                                  city: needy.city,
                                  pin: needy.pin
                                }
                            }}>Approve</Link>
                            </div>
                            <div className={styles.denial}>
                              <button className={styles.deny} onClick={() => handleDeny(needy.username)}>Deny</button>
                            </div>
                        </div>
                        <div className={styles.space}></div>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </>
  )
}
