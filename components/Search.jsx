import React from 'react'
import styles from './Search.module.css'
import FeatherIcon from 'feather-icons-react'
export default function Search({handleSearch, search, setSearch}) {
    return (
        <div className={styles.search}>
            <FeatherIcon icon='search' size={18} color="#333" />
           <input type="search" onKeyUp={e => {
               if(e.key == 'Enter') {
                   handleSearch()
               }
           }} placeholder="Search users" onChange={e => setSearch(e.target.value)} value={search} /> 
           <button className={styles.btn} onClick={handleSearch}>Search</button>
        </div>
    )
}
