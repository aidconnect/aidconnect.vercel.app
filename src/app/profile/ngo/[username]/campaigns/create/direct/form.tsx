"use client"
import { FormEvent, useEffect, useState } from "react"
import styles from "./direct.module.css"
import { useRouter } from "next/navigation"
import SolidFundrABI from "../../../../../../../../artifacts/contracts/SolidFundr.sol/SolidFundr.json";
import { ethers } from "../../../../../../../../node_modules/ethers/lib/index"

export default function Form({ needy }: any) {
    const router=useRouter()
    const contractABI = SolidFundrABI.abi;
    const contractAddress="0x49cB5A5beA3BFA9c687E6fc49A99079c1D0998db";
    
    const initWallet=async()=>{
        if(window.ethereum){
            const ethWallet=window.ethereum
            const provider = new ethers.providers.Web3Provider(ethWallet);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            return contract
        }
    }

    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        
        const contract=await initWallet()
        const amt: string = formData.get("amount") as string;
        const targetAmount=ethers.utils.parseEther(amt)
        const targetAddress = formData.get("wallet")
        const title = formData.get("name")
        const description = formData.get("cause")

        try {
            let fundId
            const createFundTx = await contract?.createFund(targetAmount, targetAddress, title, description);
            const receipt = await createFundTx.wait();
            const event=receipt.events.find((event: { event: string; })=>event.event==="FundCreated")
            if(event){
                fundId=event.args.id.toNumber()
            }
            const response=await fetch("/api/profile/ngo/campaigns",{
                method:"POST",
                body: JSON.stringify({
                    id: fundId,
                    type: 'DB',
                    name: formData.get("name"),
                    cause: formData.get("cause"),
                    amount: formData.get("amount"),
                    needy: formData.get("needy"),
                    address: formData.get("address"),
                    age: formData.get("age"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    wallet: formData.get("wallet")
                })
            })
            if(response){
                router.push("/profile")
                router.refresh()
            }
            alert("Campaign created successfully!");
        } 
        catch (error) {
            console.log("Error creating campaign:", error);
            alert("Failed to create campaign. Please try again.");
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {needy.map((needy: any, index: number)=>(
                <div className={styles.sheet} key={index}>
                    <div className={styles.details}>
                        <h1>Campaign Details</h1>
                    </div>
                    <div className={styles.name}>
                        <div className={styles.label}>
                            <label>Campaign name :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="name" type="text" placeholder="Enter campaign name" required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.cause}>
                        <div className={styles.label}>
                            <label>Campaign cause :</label>
                        </div>
                        <div className={styles.input}>
                            <textarea name="cause" placeholder="Max 200 words" required></textarea>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.amount}>
                        <div className={styles.label}>
                            <label>Amount required :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="amount" type="text" placeholder="Enter ETH required" required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.details}>
                        <h1>Beneficiary Details</h1>
                    </div>
                    <div className={styles.needyname}>
                        <div className={styles.label}>
                            <label>Name :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="needy" type="text" value={`${needy.firstname} ${needy.middlename} ${needy.lastname}`} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.address}>
                        <div className={styles.label}>
                            <label>Address :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="address" type="text" value={`${needy.city}, ${needy.district}, ${needy.state}, ${needy.country} -${needy.pin}`} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.age}>
                        <div className={styles.label}>
                            <label>Age :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="age" type="number" value={needy.age} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.email}>
                        <div className={styles.label}>
                            <label>Email :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="email" type="text" value={needy.email} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.phone}>
                        <div className={styles.label}>
                            <label>Phone :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="phone" type="tel" value={needy.phone} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.wallet}>
                        <div className={styles.label}>
                            <label>Wallet :</label>
                        </div>
                        <div className={styles.input}>
                            <input name="wallet" type="text" value={needy.wallet} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <input type="submit"></input>
                    </div>
                </div>
            ))}
        </form>
    )
}