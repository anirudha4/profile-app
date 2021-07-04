import React from 'react'
import styles from './project.module.css'
import Masonry from 'react-masonry-css'
import FeatherIcon from 'feather-icons-react'
import { motion } from 'framer-motion'
export default function Project({projects}) {
    const breakpointColumnsObj = {
        default: 2,
        1000: 1,
        500: 1
      };
    const items = projects.map((project) => (
        <div className="card" style={{marginTop: 20}} key={project.id}>
            <div className={styles.projectName}>{project.title}</div>
            <div className={styles.projectDesc}>
                {project.description}
            </div>
            <div className={styles.urls}>
                <div className={styles.live}>
                    <a rel="noopener noreferrer" href={project.liveurl ? project.liveurl : '#' } target="_blank">Live <FeatherIcon icon="link" size={14} color='#333' /></a>
                </div>
                <div className={styles.github}>
                    <a rel="noopener noreferrer" href={project.github ? project.github : '#' } target="_blank">View Repository <FeatherIcon icon="github" size={14} color='#333' /></a>
                </div>
            </div>
            <div className={styles.stack}>
                {project.techStack.length > 0 && (
                    <>
                        {project.techStack.map(stack => (
                            <div key={stack} className={styles.pill}>
                                {stack}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    ))
    return (
        <>
            {projects.length > 0 ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {items}
                </Masonry>
            ) : (
                <motion.div className="alert" initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} style={{marginTop: 30}}>
                    No Projects
                    {/* <Link href="/add-project" as="add-project">
                        <a className="alert-action">Add</a>
                    </Link> */}
                </motion.div>
            )}
        </>
    )
}

