"use client"
import Image from "next/image"
import Link from "next/link"
import Statistics from "./stats"
import { FormEvent } from "react"

export default function Home() {
  const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData=new FormData(e.currentTarget)
    const response=await fetch("/api/mail",{
        method:"POST",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message")
        })
    })
    if(response){
      alert("Feedback submitted successfully!")
    }
  }

  return (
    <>
      <head>
        <title>GIV3R</title>
      </head>
      <body>
        <nav className="navbar">
          <Link href="#home">
            <button className="home">HOME</button>
          </Link>
          <Link href="#about">
            <button className="about">ABOUT</button>
          </Link>
          <Link href={"/campaigns"}>
            <button className="campaigns">CAMPAIGNS</button>
          </Link>
          <Link href={"/"}>
            <Image className="title" priority={true} src={"/logo.png"} width={600} height={300} alt="GIV3R"/>
          </Link>
          <Link href={"/donations"}>
            <button className="volunteer">DONATIONS</button>
          </Link>
          <Link href="#contact">
            <button className="contact">CONTACT</button>
          </Link>
          <Link href={"/login"}>
            <button className="login">LOGIN</button>
          </Link>
        </nav>
        <div className="rectangle"></div>
        <div className="image">
          <p className="tagline">Spreading smiles, beyond borders!</p>
          <Image className="smile" src={"/smile.png"} width={1000} height={500} alt="Smile"/>
        </div>
        <Link href="#about">
          <div className="scroll"></div>
          <div className="dot"></div>
        </Link>
        <div className="bar"></div>
        <div className="what" id="about">
          <div className="card">
            <div className="front">
              <p className="is">What <br/>is <br/><b className="giv3r">GIV3R</b>?</p>
            </div>
            <div className="back">
              <p className="desc">GIV3R is a decentralized charity portal which aims at integrating security, transparency and tracking for your valuable donations to various NGOs.</p>
            </div>
          </div>
        </div>
        <div className="why">
          <div className="card">
            <div className="front">
              <p className="is">Why <br/>use <br/><b className="giv3r">GIV3R</b>?</p>
            </div>
            <div className="back">
              <p className="desc">Use GIV3R to harness a secure, trustable and transparent environment where you get to track each and every donation you make.</p>
            </div>
          </div>
        </div>
        <div className="how">
          <div className="card">
            <div className="front">
              <p className="is">How <br/>to use <br/><b className="giv3r">GIV3R</b>?</p>
            </div>
            <div className="back">
              <p className="desc">Register under the required role you seek. Access the corresponding dashboard. Use the available features to their fullest.</p>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <p className="flip">Flip to find out!</p>
        <h1 className="statistics">Take a look at our Stats!</h1>
        <Statistics/>
        <form className="feedback" id="contact" onSubmit={handleSubmit}>
          <div className="up">
            <div className="send">
              <p className="value">We value your precious feedback...</p>
            </div>
            <div className="button">
              <input type="submit" value={"Send"}></input>
            </div>
          </div>
          <div className="down">
            <div className="one">
              <div className="label">
                <label>Name</label>
              </div>
              <div className="input">
                <input type="text" name="name" placeholder="Enter your name" required></input>
              </div>
            </div>
            <div className="two">
              <div className="label">
                <label>Email</label>
              </div>
              <div className="input">
                <input type="text" name="email" placeholder="Enter your email" required></input>
              </div>
            </div>
            <div className="three">
              <div className="label">
                <label>Phone</label>
              </div>
              <div className="input">
                <input type="text" name="phone" placeholder="Enter your phone no."></input>
              </div>
            </div>
            <div className="four">
              <div className="label">
                <label>Message</label>
              </div>
              <div className="input">
                <textarea name="message" placeholder="Enter your message" required></textarea>
              </div>
            </div>
          </div>
        </form>
        <footer>
          <p>Designed with Love, developed with Passion</p>
        </footer>
      </body>
    </>
  )
}
