"use client"
import React, { useState, useEffect } from 'react'
import styles from "./campaign.module.css"
import Image from "next/image"
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface ApiResponse {
  data: {
    map(arg0: (campaign: any, index: number) => React.JSX.Element): React.ReactNode
    name: string,
    cause: string,
    volunteers: number,
    target: number,
    raised: number
  }
}

export default function Campaigns({ session }: { session: string }) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/profile/ngo/campaigns")
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
                <button className={styles.active}>Campaigns</button>
              </Link>
            </div>
            <div className={styles.select}>
              <Link className={styles.link} href={`/profile/ngo/${session}/approvals`}>
                <button className={styles.button}>Approvals</button>
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
        <div className={styles.campaign}>
            <div className={styles.top}>
                <h1 className={styles.title}>Active Campaigns</h1>
            </div>
            <div className={styles.bottom}>
                <div className={styles.list}>
                  <div className={styles.high}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Cause</th>
                          <th>Volunteers</th>
                          <th>Target</th>
                          <th>Raised</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.map((campaign: any, index: number) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{campaign.name}</td>
                            <td>{campaign.cause}</td>
                            <td>{campaign.volunteers}</td>
                            <td>{campaign.target}</td>
                            <td>{campaign.raised}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.low}>
                      <Link className={styles.redirect} href={`/profile/ngo/${session}/campaigns/create`}>
                          <button className={styles.create}>Create</button>
                      </Link>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
