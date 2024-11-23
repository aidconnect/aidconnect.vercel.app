"use client"
import { FormEvent, useEffect, useState } from "react"
import styles from "./donor.module.css"
import { useRouter } from "next/navigation"
import Link from "next/link"

declare global {
    interface Window {
      ethereum?: any
    }
}

export default function Form() {
    const router=useRouter()
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const response=await fetch("/api/auth/register/donor",{
            method:"POST",
            body: JSON.stringify({
                firstname: formData.get("firstname"),
                middlename: formData.get("middlename"),
                lastname: formData.get("lastname"),
                age: formData.get("age"),
                email: formData.get("email"),
                phone: formData.get("phone"),
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

    return (
        <>
            <form className={styles.enter} onSubmit={handleSubmit}>
                <div className={styles.fill}>
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