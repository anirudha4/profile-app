import { createContext, useEffect, useState } from "react";
import {auth, fire } from '../firebase'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router';
const userMetaSchema = {
    bio: "",
    designation: "",
    photoURL: "",
    projects: [],
    skills: [],
    dribbble: '',
    linkedin: '',
    twitter: '',
    github: '',
    userSettings: {
        dribbble: false,
        github: false,
        linkedin: false,
        show_repo: false,
        twitter: false
    },
    username: ""

}

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    // const [userData, setUserData] = useState(null);
    const [userMeta, setUserMeta] = useState(null)
    useEffect(() => {
        if(user) {
            fire.collection('user-meta').doc(user.uid).get()
            .then(meta => {
                setUserMeta(meta.data())
            })
        }
    }, [user])
    const logout = () => {
        auth.signOut()
        router.replace('/')
    }
    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(result => {
            const isNewUser = result.additionalUserInfo.isNewUser;
            console.log(result);
            if(isNewUser) {
                const username = result.additionalUserInfo.profile.email.split('@')[0]
                fire.collection('user-meta').doc(result.user.uid).set({...userMetaSchema, photoURL: result.user.photoURL, username, name: result.user.displayName})
                fire.collection('user-meta').doc(result.user.uid).get()
                .then(meta => {
                    console.log(meta.data());
                    setUserMeta({...meta.data()})
                    const username = meta.data().username
                    router.push(`/${username}`)
                })
            }
            else{
                fire.collection('user-meta').doc(result.user.uid).get()
                .then(meta => {
                    console.log(meta.data());
                    setUserMeta(meta.data())
                    const username = meta.data().username
                    router.push(`/${username}`)
                })
            }
        })
    }
    if(loading) {
        return (
            <div className="loader-container">
                <Loader
                    type="Oval"
                    color="#2F2789"
                    height={60}
                    width={60}
                    timeout={3000} //3 secs
                />
            </div>
        )
    }
    return (
        <AuthContext.Provider value={{user, login, logout, userMeta}}>
            {children}
        </AuthContext.Provider>
    )
}