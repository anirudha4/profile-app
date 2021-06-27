import React, { useContext } from 'react'
import styles from './usercard.module.css';
import FeatherIcon from 'feather-icons-react'
import Image from 'next/image'


export default function UserCard({designation, socials, photoURL, name}) {
    return (
        <div className="card card-profile">
            <div className={styles.cardbody}>
                <div className={styles.userimage}>
                    <Image width={150} height={150} src={photoURL} alt="" />
                </div>
                <div className={styles.name}>
                    {name}
                </div>  
                <div className={styles.designation}>
                    {designation ? designation : 'No designation set' }
                </div>
            </div>
        </div>
    )
}
