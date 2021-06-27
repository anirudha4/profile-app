import React from 'react';
import FeatherIcon from 'feather-icons-react';
import styles from './skillscard.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link'
export default function SkillsCard({skills}) {
    return (
        <div className="card card-skills">
            <div className={styles.cardbody}>
                <h1 className={styles.heading}><FeatherIcon icon={'tag'}/> Skills</h1>
                <div className={styles.skills}>
                    {skills.length > 0 ? (
                        <>
                            {skills.map(skill => (
                                <div className={styles.skill}>{skill}</div>
                            ))}
                        </>
                    ) : (
                        <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} style={{marginTop: 30}}>
                            No Skills
                            <Link href="/profile" as="add-project">
                                <a className="alert-action">Add</a>
                            </Link>
                         </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
