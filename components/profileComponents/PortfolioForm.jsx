import React, { useContext, useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import styles from "./form.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { fire } from '../../firebase'
import {motion} from 'framer-motion'
export default function PortfolioForm() {
  //portfolio form

  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState([]);
  const [username, setUsername] = useState("")
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState("");
  const {userMeta, setUserMeta, user} = useContext(AuthContext)
  const [success, setSuccess] = useState(false)
  //skills
  const handleAddSkill = (e) => {
    console.log(e.key);
    if (e.key === "Tab" && skill !== "") {
      e.preventDefault();
      setSkills([...skills, skill]);
      setSkill("");
    }
  };
  useEffect(() => {
    if(userMeta) {
      console.log(userMeta);
      setSkills(userMeta.skills)
      setBio(userMeta.bio)
      setDesignation(userMeta.designation)
      setUsername(userMeta.username)
    }
  }, [userMeta])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(skills);
    const data = {...userMeta, skills, designation, bio, username: username.toLowerCase()}
    const temp = await fire.collection('user-meta').doc(user.uid).set(data)
    setUserMeta({...userMeta, skills, designation, bio, username: username.toLowerCase()})
    setLoading(false)
    setSuccess(true)
  }
  return (
    <div>
      {success && (
        <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}>
          Profile Updated Successfully
          <FeatherIcon onClick={e => setSuccess(false)} icon={'x'} size={18} color='#2F2789' />
        </motion.div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username}  />
        </div>
        <div className={styles.field}>
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            name="designation"
            value={designation}
            onChange={e => setDesignation(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="bio">Bio</label>
          <textarea onChange={e => setBio(e.target.value)} value={bio} name="bio" rows="5"></textarea>
        </div>
        <div className={styles.field}>
          <label htmlFor="skill">Skills</label>
          <input
            type="text"
            name="skill"
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
            onKeyDown={handleAddSkill}
          />
          <span className={styles.note}>Press tab to add skill</span>
          <div className={styles.chipContainer}>
            {skills.length !== 0 &&
              skills.map((s, ind) => (
                <span className={styles.chip} key={s}>
                  {s}
                  <FeatherIcon
                    className={styles.icon}
                    icon="x"
                    size={14}
                    onClick={() => {
                      console.log("removing...");
                      skills.splice(ind, 1);
                      setSkills([...skills]);
                    }}
                  />
                </span>
              ))}
          </div>
        </div>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Updating Profile' : 'UPDATE PROFILE'}
        </button>
      </form>
    </div>
  );
}
