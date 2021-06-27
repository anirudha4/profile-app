import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./profilelayout.module.css";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import {motion} from 'framer-motion'
import {AuthContext} from '../../contexts/AuthContext'
import Loader from "react-loader-spinner";
export default function ProfileLayout({ children }) {
  const {user} = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if(!user) {
      router.replace('/')
    }
  })
  if(user) {
    return (
      <motion.div className={styles.profileLayout} exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
        <ul className={styles.sidebar}>
          <li >
            <Link href="/profile" as="profile">
              <a className={router.pathname == '/profile' ? styles.active : ""}>
                <FeatherIcon icon={"user"} style={{ marginRight: 10 }} />
                Profile
              </a>
            </Link>
          </li>
          <li >
            <Link href="/add-project" as="add-project">
              <a className={router.pathname == '/add-project' ? styles.active : ""}>
                <FeatherIcon icon={"git-branch"} style={{ marginRight: 10 }} />
                Add Project
              </a>
            </Link>
          </li>
          <li >
            <Link href="/social-profiles" as='social-profile'>
              <a className={router.pathname == '/social-profiles' ? styles.active : ""}>
                <FeatherIcon icon={"users"} style={{ marginRight: 10 }} />
                Social Profiles
              </a>
            </Link>
          </li>
          <li >
            <Link href="/account" as="account">
              <a className={router.pathname == '/account' ? styles.active : ""}>
                <FeatherIcon icon={"settings"} style={{ marginRight: 10 }} />
                Account
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.profileRight}>{children}</div>
      </motion.div>
    );
  }
  else {
    return (
      <div className="loader-container">
        <Loader 
          type="Oval"
          color="#2F2789"
          height={60}
          width={60}
          timeout={3000} //3 secs
        />
      </div>
    )
  }
}
