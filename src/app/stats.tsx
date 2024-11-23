"use client"
import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"

interface ApiResponse {
    data: any
    id_count: ReactNode
}

export default function Statistics(){
    const [data1, setData1] = useState<ApiResponse | null>(null)
    const [data2, setData2] = useState<ApiResponse | null>(null)
    const [data3, setData3] = useState<ApiResponse | null>(null)
    const [data4, setData4] = useState<ApiResponse | null>(null)
    const [data5, setData5] = useState<ApiResponse | null>(null)
    const [data6, setData6] = useState<ApiResponse | null>(null)
    const [data7, setData7] = useState<ApiResponse | null>(null)
    const [data8, setData8] = useState<ApiResponse | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/statistics/ngo")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData1(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/donor")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData2(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/needy")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData3(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/service")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData4(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/campaign")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData5(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/payment")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData6(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/total")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData7(apiData)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            setError("An error occurred while fetching data.")
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch("/api/statistics/completion")
        .then((res) => res.json())
        .then((apiData: ApiResponse) => {
            setData8(apiData)
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
            <div className="stats">
                <div className="above">
                    <Image className="loading" priority={true} src={"/loading.png"} width={300} height={300} alt="Loading"/>
                </div>
                <div className="below">
                    <h1>Loading...</h1>
                </div>
            </div>
        </>
        )
    }

    if (error){
        return (
        <>
            <div className="stats">
                <div className="above">
                    <Image className="error" priority={true} src={"/error.png"} width={300} height={300} alt="Error"/>
                </div>
                <div className="below">
                    <h1>Error loading stats!</h1>
                </div>
            </div>
        </>
        )
    }

    if (!data1 || !data2 || !data3 || !data4 || !data5 || !data6 || !data7 || !data8){
        return (
        <>
            <div className="stats">
                <div className="above">
                    <Image className="missing" priority={true} src={"/missing.png"} width={300} height={300} alt="Missing"/>
                </div>
                <div className="below">
                    <h1>No stats data.</h1>
                </div>
            </div>
        </>
        )
    }
    
    return(
        <>
            <title>GIV3R</title>
            <div className="stats">
                <div className="users">
                    {data1 && (
                        <div className="ngo">
                            <h1>{data1.data.id_count}&nbsp;<div className="user">NGOs</div></h1>
                        </div>
                    )}
                    {data2 && (
                        <div className="donor">
                            <h1>{data2.data.id_count}&nbsp;<div className="user">Donors</div></h1>
                        </div>
                    )}
                    {data3 && (
                        <div className="needy">
                            <h1>{data3.data.id_count}&nbsp;<div className="user">Beneficiaries</div></h1>
                        </div>
                    )}
                    {data4 && (
                        <div className="service">
                            <h1>{data4.data.id_count}&nbsp;<div className="user">Services</div></h1>
                        </div>
                    )}
                </div>
                <div className="space"></div>
                {data5 && (
                    <div className="campaign">
                        <h1>{data5.data.id_count}&nbsp;<div className="user">Campaigns hosted successfully</div></h1>
                    </div>
                )}
                <div className="space"></div>
                {data6 && (
                    <div className="donations">
                        <h1>{data6.data.id_count}&nbsp;<div className="user">Verified donations</div></h1>
                    </div>
                )}
                <div className="space"></div>
                <div className="numbers">
                    {data7 && (
                        <div className="total">
                            <h1>{(data7.data.id_count ?? 0).toFixed(6)}&nbsp;<div className="user">ETH raised</div></h1>
                        </div>
                    )}
                    {data5 && data8 && (
                        <div className="completion">
                            <h1>{isNaN(((data8.data.id_count)/(data5.data.id_count))*100) ? 0 : (((data8.data.id_count)/(data5.data.id_count))*100).toFixed(2)}<div className="user">% Completion rate</div></h1>
                        </div>
                    )}
                </div>
                <div className="space"></div>
            </div>
        </>
    )
}