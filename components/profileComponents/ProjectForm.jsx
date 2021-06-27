import React, { useContext, useEffect, useState } from "react";
import styles from "./form.module.css";
import FeatherIcon from "feather-icons-react";
import {AuthContext} from '../../contexts/AuthContext'
import { fire } from "../../firebase";
import { motion } from "framer-motion";
export default function ProjectForm() {
  const projectSchema = {
    title: "",
    description: "",
    techStack: [""],
    github: "",
    liveurl: "",
  };
  const {userMeta,setUserMeta, user} = useContext(AuthContext)
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [github, setGithub] = useState("");
  const [liveurl, setLiveurl] = useState("");
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if(userMeta) {
      setProjects(userMeta.projects);
      console.log(userMeta.projects);
    }
  }, [userMeta])
  useEffect(() => {
    setUserMeta(userMeta, projects)
  }, [projects])
  const clear = () => {
    setTitle("");
    setDescription("");
    setStack("");
    setTechStack([]);
    setGithub("");
    setLiveurl("");
  };
  const handleAddStack = (e) => {
    if (e.key === "Tab" && stack !== "") {
      e.preventDefault();
      setTechStack([...techStack, stack]);
      setStack("");
    }
  };
  const addProject = async (e) => {
    e.preventDefault();
    setLoading(true)
    const newProjects = [...projects];
    newProjects.push({
      title,
      description,
      techStack,
      github,
      liveurl,
    });
    const temp = await fire.collection('user-meta').doc(user.uid).set({...userMeta, projects: [...newProjects]})
    setProjects(newProjects)
    setLoading(false)
    setSuccess(true)
    clear();
  };
  return (
    <div>
      {success && (
        <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}>
          Profile Updated Successfully
          <FeatherIcon onClick={e => setSuccess(false)} icon={'x'} size={18} color='#2F2789' />
        </motion.div>
      )}
      <form onSubmit={addProject}>
        <div className={styles.field}>
          <label htmlFor="title">Project Title </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value={description}
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="github">Github</label>
          <input
            type="url"
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="liveurl">Live URL</label>
          <input
            type="url"
            name="liveurl"
            value={liveurl}
            onChange={(e) => setLiveurl(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="stack">Tech Stack</label>
          <input
            type="text"
            name="stack"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            onKeyDown={handleAddStack}
          />
          <div className={styles.chipContainer}>
            {techStack.length !== 0 &&
              techStack.map((s, ind) => (
                <span className={styles.chip} key={s}>
                  {s}
                  <FeatherIcon
                    className={styles.icon}
                    icon="x"
                    size={14}
                    onClick={() => {
                      techStack.splice(ind, 1);
                      setTechStack([...techStack]);
                    }}
                  />
                </span>
              ))}
          </div>
        </div>
        <button disabled={loading} className={styles.btn}>
          {loading ? 'Adding Project' : 'Add Project'}
        </button>
      </form>
     
    </div>
  );
}
