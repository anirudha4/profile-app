import React, { useState, useEffect, useContext } from "react";
import styles from "./form.module.css";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { fire } from "../../firebase";
export default function SocialForm() {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [dribbble, setDribbble] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(true)
  const {userMeta, user} = useContext(AuthContext)
  useEffect(() => {
    if(userMeta) {
      setDribbble(userMeta.dribbble)
      setLinkedin(userMeta.linkedin)
      setTwitter(userMeta.twitter)
      setGithub(userMeta.github)
    }
  }, [userMeta])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fire.collection('user-meta').doc(user.uid).set({...userMeta, github, dribbble, linkedin, twitter})
    setLoading(false)
    setSuccess(true)
  };
  return (
    <div>
      {alert && (
        <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}>
          <div style={{display: "flex", alignItems: "center"}}>
              <FeatherIcon icon="info" className={styles.infoIcon} />
              &nbsp;
              Paste Social Links
          </div>
          <FeatherIcon onClick={e => setAlert(false)} icon={'x'} size={18} color='#2F2789' />
        </motion.div>
      )}

      {success && (
        <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}>
          Profile Updated Successfully
          <FeatherIcon onClick={e => setSuccess(false)} icon={'x'} size={18} color='#2F2789' />
        </motion.div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="github">Github </label>
          <input
            type="url"
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="linkedin">LinkedIn </label>
          <input
            type="url"
            name="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="dribbble">Dribbble </label>
          <input
            type="url"
            name="dribbble"
            value={dribbble}
            onChange={(e) => setDribbble(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="facebook">Twitter</label>
          <input
            type="url"
            name="facebook"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <button className={styles.btn} disabled={loading}>
          {loading ? 'Updating Links' : 'UPDATE LINKS'}
        </button>
      </form>
    </div>
  );
}
