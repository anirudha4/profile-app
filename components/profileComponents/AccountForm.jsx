import React, { useState } from "react";
import styles from "./form.module.css";
import { motion } from "framer-motion";
import FeatherIcon from 'feather-icons-react'
export default function AccountForm() {
  const [showGit, setShowGit] = useState(false);
  const [prefer, setPrefer] = useState(false);
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <div>
      <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}>
          <div style={{display: "flex", alignItems: "center"}}>
              <FeatherIcon icon="info" className={styles.infoIcon} />
              &nbsp;
              Features in Development
          </div>
        </motion.div>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="github">Show Github Repositories</label>
          <div className={styles.switch}>
            <input type="checkbox" checked={showGit} />
            <span
              className={styles.slider}
              onClick={() => {
                setShowGit(!showGit);
              }}
            ></span>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="preference">Prefer Experience over Projects</label>
          <div className={styles.switch}>
            <input type="checkbox" checked={prefer} />
            <span
              className={styles.slider}
              onClick={() => {
                setPrefer(!prefer);
              }}
            ></span>
          </div>
        </div>
        <div className={styles.field}>
          <label>Which social links to show on the Profile Card</label>
          <div className={styles.links}>
            <div className={styles.link}>
              <input type="checkbox" />
              <span>Github</span>
            </div>
            <div className={styles.link}>
              <input type="checkbox" />
              <span>Dribbble</span>
            </div>
            <div className={styles.link}>
              <input type="checkbox" />
              <span>LinkedIn</span>
            </div>
            <div className={styles.link}>
              <input type="checkbox" />
              <span>Facebook</span>
            </div>
          </div>
        </div>
        <button disabled={true} className={styles.btn}>UPDATE SETTINGS</button>
      </form>
    </div>
  );
}
