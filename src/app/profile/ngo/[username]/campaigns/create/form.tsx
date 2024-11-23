"use client"
import { FormEvent } from "react"
import styles from "./create.module.css"
import { useRouter } from "next/navigation"
import SolidFundrABI from "../../../../../../../artifacts/contracts/SolidFundr.sol/SolidFundr.json";
import { ethers } from "../../../../../../../node_modules/ethers/lib/index"

export default function Form({ session }: { session: string }) {
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
        const targetAddress = session
        const title = formData.get("name")
        const description = formData.get("cause")

        try{
            let fundId
            const createFundTx = await contract?.createFund(targetAmount, targetAddress, title, description);
            const receipt=await createFundTx.wait();
            const event=receipt.events.find((event: { event: string; })=>event.event==="FundCreated")
            if(event){
                fundId=event.args.id.toNumber()
            }
            const response=await fetch("/api/profile/ngo/campaigns",{
                method:"POST",
                body: JSON.stringify({
                    id: fundId,
                    type: 'CC',
                    name: formData.get("name"),
                    cause: formData.get("cause"),
                    amount: formData.get("amount"),
                    needy: formData.get("volunteers"),
                    address: '',
                    age: 0,
                    email: '',
                    phone: '',
                    wallet: ''
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
            <div className={styles.one}>
                <label>Campaign name:</label>
                <input name="name" type="text" placeholder="No constraints" required/>
            </div>
            <div className={styles.two}>
                <label>Cause:</label>
                <textarea name="cause" placeholder="200 words max" required></textarea>
            </div>
            <div className={styles.three}>
                <div className={styles.west}>
                    <div className={styles.north}>
                        <label>Amount required:</label>
                    </div>
                    <div className={styles.south}>
                        <input name="amount" type="text" placeholder="No constraints" required></input>
                    </div>
                </div>
                <div className={styles.east}>
                    <div className={styles.north}>
                        <label>Volunteers required:</label>
                    </div>
                    <div className={styles.south}>
                        <input name="volunteers" type="number" placeholder="No constraints" required></input>
                    </div>
                </div>
            </div>
            <div className={styles.four}>
                <input type="submit"></input>
            </div>
        </form>
    )
}