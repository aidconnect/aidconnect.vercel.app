"use client"
import React, { useState, useEffect } from 'react'
import styles from "./payments.module.css"
import Image from "next/image"
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface ApiResponse {
  data: {
    map(arg0: (donor: any, index: number) => React.JSX.Element): React.ReactNode
    from_name: string,
    amount: number,
    campaign_id: number,
    hash: string
  }
}

export default function Payments({ session }: { session: string }) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/profile/service/payments")
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
              <Link className={styles.link} href={`/profile/service/${session}/dashboard`}>
                <button className={styles.button}>Dashboard</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/service/${session}/payments`}>
                <button className={styles.active}>Payments</button>
              </Link>
            </div>
          </div>
          <div className={styles.three}>
            <button className={styles.logout} onClick={()=>{signOut()}}>Logout</button>
          </div>
        </div>
        <div className={styles.donations}>
            <div className={styles.top}>
                <h1 className={styles.title}>Payment History</h1>
            </div>
            <div className={styles.bottom}>
                <div className={styles.flex}>
                    {data.data.map((donor: any,index: number) => (
                        <div className={styles.pending} key={index}>
                            <div className={styles.list}>
                                <Link className={styles.txn} href={`https://sepolia.etherscan.io/tx/${donor.hash}`}>Received {donor.amount} ETH from {donor.from_name} through Service {donor.campaign_id}</Link>
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
