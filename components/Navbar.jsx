import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FeatherIcon from 'feather-icons-react'
import logo from '../assets/logo.svg'
export default function Navbar() {
    const {user, login, logout, userMeta} = useContext(AuthContext)
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/">
                    <Image className={styles.logo} src={logo} width={80} height={40} />
                </Link>
            </div>
            <div className={styles.right}>
                {!user ? (
                   <>
                        <button className={styles.login} onClick={login}>Sign in with Google</button>
                        
                   </>
                ) : (
                    <>
                        <Link  href={userMeta ? userMeta.username : ''}>
                            <a className={styles.name}>{userMeta ? userMeta.username : ''}</a>
                        </Link>
                        <Link href="/profile">
                            <a className={styles.profile}>A</a>
                        </Link>
                        <button className={styles.logout} onClick={logout}><span>Logout</span> <FeatherIcon icon='log-out' size={18} color='red' /></button>
                    </>
                )}
            </div>
        </nav>
    )
}


