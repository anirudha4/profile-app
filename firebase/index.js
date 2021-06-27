import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";
if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: "AIzaSyDd6GtYPVDAZVNYTNneX0cjr-FRk0pi3As",
        authDomain: "profile-1e710.firebaseapp.com",
        projectId: "profile-1e710",
        storageBucket: "profile-1e710.appspot.com",
        messagingSenderId: "436216084726",
        appId: "1:436216084726:web:494347aa0c8d8ee754d4d7"
    }) 
}
const auth = firebase.auth()
const fire = firebase.firestore()
export { auth, fire };