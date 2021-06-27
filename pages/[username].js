import UserCard from '../components/UserCard';
import SkillsCard from '../components/SkillsCard';
import Projects from '../components/Project';
import {fire} from '../firebase'
import {motion} from 'framer-motion'
export default function User({meta}) {
  return (
    <motion.main className="cards" exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
        <div className="left">
            <UserCard designation={meta.designation} name={meta.name} socials={meta.socials} photoURL={meta.photoURL} username={meta.username} />
            <SkillsCard />
        </div>
        <div className="right">
            <h1>Projects</h1>
            <Projects projects={meta.projects} />
        </div>
    </motion.main>
  )
}
export async function getStaticPaths() {
  const usernames = []
  const data = await fire.collection('user-meta').get()
  data.forEach(doc => {
    usernames.push(
      {
        params: {username: doc.data().username}
      }
    )
  })
  return {
    paths:usernames,
    fallback: true
  };
}

export async function getStaticProps({params}) {
  const username = params.username;

  const userData = await fire.collection('user-meta').where('username', '==', username).get()
  let meta = {}
  userData.forEach(doc => {
    meta = {
      id: doc.id,
      ...doc.data()
    }
  })

  return {
    props: {
      meta
    },
    revalidate: 5
  }
}
