import React, {useContext, useState} from 'react'
import paths from '../paths/paths'
import burger from '../assets/burger.svg'
import axios from 'axios'
import styles from '../assets//NavBar.module.css'
import {UserContext} from "../context/UserContext";

const NavBar = () => {
    const [showNav, setShowNav] = useState<boolean>(false)
    const [user, setUser]= useContext(UserContext)

    const toggleNavItems = () => {
        setShowNav(!showNav)
    }

    const handleGoogleLogout = () => {
      axios.get("http://localhost:5051/auth/logout", {withCredentials: true})
      .then (res => {
        if (res.data) {
          console.log(res.data);
          window.location.href = "/"
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