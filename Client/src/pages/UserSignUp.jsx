import React,{useState} from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import styles from "../assets/styles/signUp.module.css";

const SignUpPage = () => {
   const [formData,setformData] = useState({name:"",email:"",password:"",phone:""})
   const [error,Seterror] = useState('')
   const [success,Setsuccess] = useState('')

   const HandleChange = (e) => {
    const {name,value} = e.target
    setformData({...formData,[name]:value})
   }
   ///console.log(formData)
   const HandleSubmit = async (e) => {
    e.preventDefault()
    Seterror('')//Reset previous errors
    Setsuccess('')//Reset previous success
    try {
      const response = await fetch('v1/api/register',{
        method:'POST',
        headers:{
          content:"application/json"
        },
        body:JSON.stringify(formData)
      })
      if (!response.ok){
        throw new Error("Failed to create an account. Please try again.")
      }
      const data = await response.json()
      Setsuccess("Account created successfully!")
      console.log(data)
    } catch (error) {
      Seterror(error.message)
    }
  }
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.title}>Create Your Account</h1>
      <form className={styles.signUpForm}>
        <div className={styles.inputGroup}>
          <FaUser className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
            name = "name"
            onChange={HandleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            placeholder="Email Address"
            required
            className={styles.input}
            name = "email"
            onChange={HandleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
            name = "password"
            onChange={HandleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaPhoneAlt className={styles.inputIcon} />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className={styles.input}
            name = "phone"
            onChange={HandleChange}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Sign Up
        </button>
      </form>
      <p className={styles.footerText}>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUpPage;
