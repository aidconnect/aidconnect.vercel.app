"use client"
import { FormEvent } from "react"
import styles from "./payments.module.css"
import { useRouter } from "next/navigation"
import SolidFundrABI from "../../../artifacts/contracts/SolidFundr.sol/SolidFundr.json";
import { ethers } from "../../../node_modules/ethers/lib/index"

export default function Form({details}: any) {
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
        const amount=ethers.utils.parseEther(amt)
        const idString: string = formData.get("id") as string;
        const fundId: number = idString ? parseInt(idString, 10) : 0
        try {
            const donationTx = await contract?.donate(fundId, { value: amount });
            await donationTx.wait();
            const response=await fetch("/api/payments",{
                method:"POST",
                body: JSON.stringify({
                    id: fundId,
                    type: formData.get("type"),
                    from: formData.get("from"),
                    to: formData.get("to"),
                    left: formData.get("left"),
                    amount: formData.get("amount"),
                    hash: donationTx.hash
                })
            })
            if(response){
                router.push("/profile")
                router.refresh()
            }
            alert("Donation successful!");
        } 
        catch (error) {
            console.error("Error donating to fund:", error);
            alert("Failed to donate to fund. Please try again.");
        }
    }
    return(
        <>
        {details.map((details: any, index: number)=>(
            <form className={styles.form} key={index} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <div className={styles.typenid}>
                        <div className={styles.nothing}></div>
                        <div className={styles.type}>
                            <div className={styles.label}>
                                <label>Type :</label>
                            </div>
                            <div className={styles.input}>
                                <input type="text" name="type" value={details.type} readOnly required></input>
                            </div>
                        </div>
                        <div className={styles.id}>
                            <div className={styles.label}>
                                <label>ID :</label>
                            </div>
                            <div className={styles.input}>
                                <input type="text" name="id" value={details.id} readOnly required></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.from}>
                        <div className={styles.label}>
                            <label>From :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="from" value={details.from} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.to}>
                        <div className={styles.label}>
                            <label>To :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="to" value={details.to} readOnly required></input>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.balance}>
                        <div className={styles.label}>
                            <label>Raise left :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="left" value={details.left} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.amount}>
                        <div className={styles.label}>
                            <label>Enter amount :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="amount" placeholder="Enter amount in ETH" required></input>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <input type="submit"></input>
                    </div>
                </div>
            </form>
        ))}
        </>
    )
}