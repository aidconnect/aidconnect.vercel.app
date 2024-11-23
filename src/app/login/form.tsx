"use client"
import { FormEvent } from "react"
import styles from "./login.module.css"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Form() {
    const router=useRouter()
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const response=await signIn("credentials",{
            category: formData.get("category"),
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false
        })
        if(!response?.error){
            router.push("/profile")
            router.refresh()
        }
    }

    return (
        <form className={styles.enter} onSubmit={handleSubmit}>
            <div className={styles.category}>
                <label>Category :</label>
                <select name="category" defaultValue={""} required>
                    <option value={""} disabled>Select category</option>
                    <option>NGO</option>
                    <option>Service Provider</option>
                    <option>Donor</option>
                    <option>Beneficiary</option>
                </select>
            </div>
            <div className={styles.username}>
                <label>Username :</label>
                <input name="username" type="text" maxLength={25} placeholder="Enter username" required/>
            </div>
            <div className={styles.password}>
                <label>Password :</label>
                <input name="password" type="password" maxLength={25} placeholder="Enter password" required/>
            </div>
            <div className={styles.submit}>
                <input type="submit" value={"Login"}/>
            </div>
        </form>
    )
}