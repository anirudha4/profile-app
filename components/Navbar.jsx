import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FeatherIcon from 'feather-icons-react'
export default function Navbar() {
    const {user, login, logout, userMeta} = useContext(AuthContext)
    return (
        <nav className={styles.navbar}>
            <div className={styles.right}>
                <Link href="/">
                    <a className={styles.logo}>LOGO</a>
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
                        <button className={styles.logout} onClick={logout}>Logout <FeatherIcon icon='log-out' size={18} color='red' /></button>
                    </>
                )}
            </div>
        </nav>
    )
}


