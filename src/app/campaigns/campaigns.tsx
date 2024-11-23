"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./campaigns.module.css"
import Link from "next/link"

interface ApiResponse {
    data: {
        map(arg0: (campaigns: any, index: number) => React.JSX.Element): React.ReactNode
        id: number,
        name: string,
        cause: string,
        volunteers: number,
        target: number,
        raised: number,
        ngo_name: string,
        to_name: string,
        address: string,
        age: number,
        email: string,
        phone: number,
        wallet: string,
        type: string
    }
}

export default function CampaignsPage(){
    const [data, setData] = useState<ApiResponse | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/campaigns")
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
            <div className={styles.campaigns}>
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
            <div className={styles.campaigns}>
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
            <div className={styles.campaigns}>
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
                <title>GIV3R丨Campaigns</title>
                <div className={styles.campaigns}>
                    {data.data.map((campaigns: any, index: number) => (
                        <>
                            <div className={styles.card} key={index}>
                                <div className={styles.head}>
                                    <h1>{campaigns.name} ({campaigns.type})</h1>
                                </div>
                                <div className={styles.cause}>
                                    <p>{campaigns.cause}</p>
                                </div>
                                <div className={styles.to}>
                                    <div className={styles.left}></div>
                                    <div className={styles.right}>
                                        <p><b>Name:</b> {campaigns.to_name}</p>
                                        <p><b>Address:</b> {campaigns.address}</p>
                                        {campaigns.type === 'DB' ? (
                                            <p><b>Age:</b> {campaigns.age}</p>
                                        ) : null}
                                        <p><b>Email:</b> {campaigns.email}</p>
                                        <p><b>Phone:</b> {campaigns.phone}</p>
                                        <br/>
                                        <h6><b>Wallet ID:</b> {campaigns.wallet}</h6>
                                    </div>
                                </div>
                                <div className={styles.by}>
                                    <p>Hosted by {campaigns.ngo_name}</p>
                                </div>
                                <div className={styles.pay}>
                                    <Link className={styles.link} href={{
                                        pathname: '/payments',
                                        query:{
                                            id: campaigns.id,
                                            type: campaigns.type,
                                            wallet: campaigns.wallet,
                                            balance: campaigns.target-campaigns.raised
                                        }
                                    }}>Donate</Link>
                                </div>
                            </div>
                            <div className={styles.space}></div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}