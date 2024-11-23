"use client"
import React, { useState, useEffect } from 'react'
import styles from "./dashboard.module.css"
import Image from "next/image"
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface ApiResponse {
  data: {
    firstname: string,
    middlename: string,
    lastname: string,
    username: string,
    total: number,
    number: number,
    wallet: string
  }
}

interface ApiResponse2{
  data: {
    map(arg0: (recent: any, index: number) => React.JSX.Element): React.ReactNode
    amount: number,
    type: string,
    campaign_id: number
  }
}

export default function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [data2, setData2] = useState<ApiResponse2 | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/profile/donor/dashboard")
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

  useEffect(() => {
    fetch("/api/profile/donor/dashboard/recent")
      .then((res) => res.json())
      .then((apiData: ApiResponse2) => {
        setData2(apiData)
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
              <Link className={styles.link} href={`/profile/donor/${data.data.username}/dashboard`}>
                <button className={styles.active}>Dashboard</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/donor/${data.data.username}/donations`}>
                <button className={styles.button}>Donations</button>
              </Link>
            </div>
          </div>
          <div className={styles.three}>
            <button className={styles.logout} onClick={()=>{signOut()}}>Logout</button>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.info}>
            <div className={styles.left}>
              <div className={styles.top}>
                <div className={styles.details}>
                  <div className={styles.high}>
                    <div className={styles.lt}>
                      <Image className={styles.dp} priority={true} src={"/profile.png"} width={175} height={175} alt="Profile"/>
                    </div>
                    <div className={styles.rt}>
                      <h1 className={styles.name}>{data.data.firstname} {data.data.middlename} {data.data.lastname}</h1>
                    </div>
                  </div>
                  <div className={styles.low}>
                    <p>Wallet details: {data.data.wallet}</p>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.west}>
                  <div className={styles.volunteers}>
                    <p>Total donation: {data.data.total} ETH</p>
                  </div>
                </div>
                <div className={styles.east}>
                  <div className={styles.campaigns}>
                    <p>Number of donations: {data.data.number}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.recent}>
                <p className={styles.title}>Recent Donations</p>
                <br/>
                <div className={styles.history}>
                  {data2?.data.map((recent: any,index: number) => (
                    <p key={index}>{recent.amount} to {recent.type}: {recent.campaign_id}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
