"use client"
import { FormEvent } from "react"
import styles from "./pay.module.css"
import { useRouter } from "next/navigation"
import SolidFundrABI from "../../../../../../../artifacts/contracts/SolidFundr.sol/SolidFundr.json";
import { ethers } from "../../../../../../../node_modules/ethers/lib/index"

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
        let contract,amt: string,fundId: number
        
        contract=await initWallet()
        amt = formData.get("amount") as string;
        const targetAmount=ethers.utils.parseEther(amt)
        const targetAddress = formData.get("to")
        const title = "Service Payment"
        const description = `${formData.get("id")}, ${formData.get("service")}, ${formData.get("name")}, ${formData.get("email")}, ${formData.get("phone")}, ${formData.get("address")}`
        const createFundTx = await contract?.createFund(targetAmount, targetAddress, title, description);
        const receipt=await createFundTx.wait();
        const event=receipt.events.find((event: { event: string; })=>event.event==="FundCreated")
        fundId=event.args.id.toNumber()
        
        contract=await initWallet()
        try {
            const donationTx = await contract?.donate(fundId, { value: targetAmount });
            await donationTx.wait();
            const response=await fetch("/api/profile/ngo/services/pay",{
                method:"POST",
                body: JSON.stringify({
                    id: fundId,
                    to_id: formData.get("id"),
                    to_name: formData.get("name"),
                    amount: formData.get("amount"),
                    type: formData.get("service"),
                    hash: donationTx.hash
                })
            })
            if(response){
                router.push("/profile")
                router.refresh()
            }
            alert("Transaction successful!");
        } 
        catch (error) {
            console.error("Error paying to service provider:", error);
            alert("Failed to pay to service provider. Please try again.");
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
                                <label>ID :</label>
                            </div>
                            <div className={styles.input}>
                                <input type="text" name="id" value={details.id} readOnly required></input>
                            </div>
                        </div>
                        <div className={styles.id}>
                            <div className={styles.label}>
                                <label>Service :</label>
                            </div>
                            <div className={styles.input}>
                                <input type="text" name="service" value={details.service} readOnly required></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.name}>
                        <div className={styles.label}>
                            <label>Name :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="name" value={details.name} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.email}>
                        <div className={styles.label}>
                            <label>Email :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="email" value={details.email} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.phone}>
                        <div className={styles.label}>
                            <label>Phone :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="phone" value={details.phone} readOnly required></input>
                        </div>
                    </div>
                    <div className={styles.address}>
                        <div className={styles.label}>
                            <label>Address :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="address" value={details.address} readOnly required></input>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.to}>
                        <div className={styles.label}>
                            <label>To :</label>
                        </div>
                        <div className={styles.input}>
                            <input type="text" name="to" value={details.to} readOnly required></input>
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
                    <div className={styles.amount}>
                        <div className={styles.label}>
                            <label>Amount :</label>
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