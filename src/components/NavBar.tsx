import React, {useContext, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import paths from '../paths/paths'
import burger from '../assets/burger.svg'
import axios from 'axios'
import styles from '../assets//NavBar.module.css'
import {UserOauthContext} from "../context/UserContext";

const NavBar = () => {
    const [showNav, setShowNav] = useState<boolean>(false)
    const {userOauth, setUserOauth}= useContext(UserOauthContext)
    const navigate = useNavigate()

    const toggleNavItems = () => {
        setShowNav(!showNav)
    }

    const handleGoogleLogout = () => {
      console.log("click delete")
      axios.get("http://localhost:5051/auth/logout", {withCredentials: true})
      .then (res => {
        if (res.data === "success") {
          // console.log(res.data);
          window.location.href = "/"
          // navigate("/")
        }
      })
    }

    const handleLogout = () => {
        localStorage.removeItem("userToken")
        setUser(null)
        window.location.href = "/"     
    }
    return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

      <span className={styles.navTitle}> 📓 Todo 📓</span>
      <button onClick={handleGoogleLogout}>
            Logout
        </button>
        <button onClick={handleLogout}>
            Basic Logout
        </button>
        <div className={styles.menu} onClick={toggleNavItems}>
            <img src={burger} alt="burger menu" className={styles.burger}/>
        </div>
        <div className={`${styles.navElements} ${ showNav ? styles.active : ""}`}>
        <ul>
        <li>
            <a href={paths.HOME} >Home</a>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default NavBar