"use client"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, FormEvent } from 'react'
import styles from "./needy.module.css"
import Image from "next/image"
import Link from "next/link"

declare global {
  interface Window {
    ethereum?: any
  }
}


interface ApiResponse {
  data: {
    map(arg0: (ngo: any, index: number) => React.JSX.Element): React.ReactNode
    name: string
  }
}

export default function Form() {
    const router=useRouter()
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const ngos=formData.getAll('ngo');
        const response=await fetch("/api/auth/register/needy",{
            method:"POST",
            body: JSON.stringify({
                ngo: ngos,
                firstname: formData.get("firstname"),
                middlename: formData.get("middlename"),
                lastname: formData.get("lastname"),
                age: formData.get("age"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                country: formData.get("country"),
                state: formData.get("state"),
                district: formData.get("district"),
                city: formData.get("city"),
                pin: formData.get("pin"),
                wallet: formData.get("wallet"),
                username: formData.get("username"),
                password: formData.get("password")
            })
        })
        if(response){
            router.push("/profile")
            router.refresh()
        }
    }
    
    const [data, setData] = useState<ApiResponse | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/auth/register/needy")
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

    const [ethWallet, setEthWallet] = useState(undefined)
    const [account, setAccount] = useState([])

    const initWallet=async()=>{
        if(window.ethereum){
            setEthWallet(window.ethereum)
        }
    }

    const connectAccount=async()=>{
        if(!ethWallet){
            alert("Metamask wallet is required to connect!")
            return
        }
        try{
            const id=await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            setAccount(id)
        }
        catch(error){
            alert("Failed to connect account! Please try again.")
        }
    }

    useEffect(()=>{
        initWallet()
    },[])

    if (isLoading){
        return (
        <>
            <div className={styles.enter}>
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
            <div className={styles.enter}>
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
            <div className={styles.enter}>
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
            <form className={styles.enter} onSubmit={handleSubmit}>
                <div className={styles.fill}>
                    <div className={styles.ngo}>
                        <div className={styles.label}>
                            <label>Select NGOs :</label>
                        </div>
                        <div className={styles.input}>
                            <select multiple name="ngo">
                                {data?.data.map((ngo: any, index: number) => (
                                    <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
                                ))}
                            </select>
                        </div>    
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.firstname}>
                        <div className={styles.label}>
                            <label>First name :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="firstname" type="text" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.middlename}>
                        <div className={styles.label}>
                            <label>Middle name :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="middlename" type="text" placeholder="Not compulsory"/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.lastname}>
                        <div className={styles.label}>
                            <label>Last name :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="lastname" type="text" placeholder="Not compulsory"/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.age}>
                        <div className={styles.label}>
                            <label>Age :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="age" type="number" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.email}>
                        <div className={styles.label}>
                            <label>Email :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="email" type="email" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.phone}>
                        <div className={styles.label}>
                            <label>Phone :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="phone" type="tel" pattern="[0-9]{10}" placeholder="10 digits" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.country}>
                        <div className={styles.label}>
                            <label>Country :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="country" type="text" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.state}>
                        <div className={styles.label}>
                            <label>State :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="state" type="text" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.district}>
                        <div className={styles.label}>
                            <label>District :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="district" type="text" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.city}>
                        <div className={styles.label}>
                            <label>City :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="city" type="text" placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.pin}>
                        <div className={styles.label}>
                            <label>Pin-code :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="pin" type="tel" pattern="[1-9]{1}[0-9]{5}" placeholder="6 digits" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.wallet}>
                        <div className={styles.label}>
                            <label>Wallet ID :</label>
                        </div>
                        <div className={styles.inp}>
                            <div className={styles.up}>
                                <input name="wallet" type="text" value={account[0]} placeholder="Select only 1 account" readOnly required/>
                            </div>
                            <div className={styles.down}>
                                <div className={styles.down_left}>
                                    <button className={styles.connect} onClick={connectAccount}>Connect</button>
                                </div>
                                <div className={styles.down_right}>
                                    <Link className={styles.create} href={'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'}>Create</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.username}>
                        <div className={styles.label}>
                            <label>Username :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="username" type="text" maxLength={25} placeholder="Max length 25" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.password}>
                        <div className={styles.label}>
                            <label>Password :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="password" type="password" maxLength={25} placeholder="No constraints" required/>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                </div>
                <div className={styles.submit}>
                    <input type="submit"/>
                </div>
            </form>
        </>
    )
}
