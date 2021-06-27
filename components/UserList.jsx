import React from 'react'
import UserListItem from './UserListItem'
import styles from './UserList.module.css'
import FeatherIcon from 'feather-icons-react'
export default function UserList({users}) {
    return (
        <div className={styles.userList}>
            <div className={styles.userGrid}>
                {
                    users.length > 0 ? (
                        <>
                            {users.map(user => (
                                <div className={styles.cardContainer} key={user.username}>
                                    <UserListItem  designation={user.designation} name={user.name} socials={user.socials} photoURL={user.photoURL} username={user.username} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.message}>
                            <div className="text">
                                No users with this username/name
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
