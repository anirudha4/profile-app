import React, { useContext } from 'react'
import styles from './UserListItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
export default function UserListItem({designation, socials, photoURL, name, username}) {
    return (
        <div className={styles.userCard}>
            <div className={styles.cardbody}>
                <div className={styles.userimage}>
                    <Image src={photoURL} width={50} height={50} />
                </div>
                <div className={styles.right}>
                    <Link href={`/${username}`}>
                        <a className={styles.name}>{name}</a>
                    </Link>
                    <Link href={`/${username}`}>
                        <a className={styles.username}>{username}</a>
                    </Link>
                    <div className={styles.designation}>
                        {designation ? designation : 'No designation set' }
                    </div>
                </div>
            </div>
        </div>
    )
}