"use client"
import { useEffect, useState } from "react"
import styles from "./donations.module.css"
import Image from "next/image"
import Link from "next/link"

interface ApiResponse {
    data: {
        map(arg0: (donations: any, index: number) => React.JSX.Element): React.ReactNode
        from_name: string,
        amout: number,
        to_name: string,
        type: string,
        campaign_id: number,
        hash: string
    }
}

export default function DonationsPage(){
    const [data, setData] = useState<ApiResponse | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/donations")
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
            <div className={styles.donations}>
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
            <div className={styles.donations}>
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
            <div className={styles.donations}>
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
    return(
        <>  
            <div className={styles.box}>
                <title>GIV3R丨Donations</title>
                <div className={styles.donations}>
                    {data.data.map((donations: any, index: number) => (
                        <>
                            <div className={styles.card} key={index}>
                                {donations.type === 'DB' || donations.type === 'CC' ? (
                                    <Link className={styles.link} href={`https://sepolia.etherscan.io/tx/${donations.hash}`}>{donations.from_name} donated {donations.amount} ETH to {donations.to_name} through Campaign {donations.campaign_id} ({donations.type})</Link>
                                ): <Link className={styles.link} href={`https://sepolia.etherscan.io/tx/${donations.hash}`}>{donations.from_name} paid {donations.amount} ETH to {donations.to_name} for {donations.type} (Service)</Link>}
                            </div>
                            <div className={styles.space}></div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}