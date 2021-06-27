import { useState } from 'react';
import Search from '../components/Search';
import UserList from '../components/UserList'
import { fire } from '../firebase'
import  {motion} from 'framer-motion'
export default function Home({users}) {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(users)
  const handleSearch = () => {
    console.log(search);
    if(search) {
      const temp = users.filter(user => {
        return (user.username.includes(search) || user.name.includes(search))
      })
      console.log(temp, "temp");
      setFiltered(temp)
    }
    else{
      setFiltered(users)
    }
  }
  return (
    <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
      <Search handleSearch={handleSearch} search={search} setSearch={setSearch} />
      <UserList users={filtered} />
    </motion.div>
  )
}


export async function getStaticProps() {
  const data = await fire.collection('user-meta').get()
  let users = []
  data.forEach(doc => {
    users.push(
      {
        id: doc.id,
        ...doc.data()
      }
    )
  })
  return {
    props: {
      users
    }
  }
}