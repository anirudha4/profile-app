import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {fire} from '../firebase'
const UserMetaContext = createContext();

const UserMetaContextProvider = ({children}) => {
    const [usermeta, setUsermeta] = useState({})
    const {user} = useContext(AuthContext)
    const loadData = async () => {
        const userData = await fire.collection('user-meta').doc(user.uid).get()
        setUsermeta(userData.data())
    }
    useEffect(() => {
        if(user)
            loadData()
    }, [user])
    return (
        <UserMetaContext.Provider value={{usermeta, setUsermeta}}>
            {children}
        </UserMetaContext.Provider>
    )
}
export { UserMetaContext, UserMetaContextProvider }