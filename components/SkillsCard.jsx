import React from 'react';
import FeatherIcon from 'feather-icons-react';
import styles from './skillscard.module.css';
export default function SkillsCard() {
    return (
        <div className="card card-skills">
            <div className={styles.cardbody}>
                <h1 className={styles.heading}><FeatherIcon icon={'tag'}/> Skills</h1>
                <div className={styles.skills}>
                    <div className={styles.skill}>HTML</div>
                    <div className={styles.skill}>CSS</div>
                    <div className={styles.skill}>JAVASCRIPT</div>
                    <div className={styles.skill}>REACT</div>
                    <div className={styles.skill}>NEXT</div>
                    <div className={styles.skill}>FRAMER</div>
                </div>
            </div>
        </div>
    )
}
