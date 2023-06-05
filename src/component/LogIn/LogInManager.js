import React from 'react';
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import firebaseConfig from './fireBase.config.js';


export const initializeLogInFrameWork = () => {
    initializeApp(firebaseConfig)
}

export const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();  
    const auth = getAuth();
    try {
        const res = await signInWithPopup(auth, provider);
        const { photoURL, displayName, email } = res.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true
        };
        return signedInUser;
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
    
}
export const handleFbSignIn = async ()=> {
    const providerFb = new FacebookAuthProvider();
    const auth = getAuth();
    try {
        const res = await signInWithPopup(auth, providerFb);
        console.log(res.user);
    } catch (err) {
        return console.log(err.code);
    }
}
export const handleSignOut = async ()=> {
    const auth = getAuth();
    try {
        await auth.signOut();
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        };
        return signedOutUser;
    } catch (err) {
        return console.log(err);
    }
}
export const createUsersWithEmailAndPassword = async (name, email, password) => {
const auth = getAuth();
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const newUserInfo = res.user;
        newUserInfo.success = true;
        newUserInfo.error = '';
        displayName(name);
        return newUserInfo;
    } 
    catch (err) {
        const newUserInfo_1 = {};
        newUserInfo_1.error = err.message;
        newUserInfo_1.success = false;
        return newUserInfo_1;
    }
}
export const signInUserWithEmailAndPassword = async ( email, password) => {
    const auth = getAuth();
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const newUserInfo = { ...user };
        newUserInfo.success = true;
        newUserInfo.error = '';
        return newUserInfo;
    } 
    catch (err) {
        const newUserInfo_1 = {};
        newUserInfo_1.error = err.message;
        newUserInfo_1.success = false;
        return newUserInfo_1;
    }
    
}

const displayName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name 
    }).then(() => {
      console.log('profile updated')
    }).catch((error) => {
      console.log(error)
    });
}
const LogInManager = () => {
    return (
        <div>
            
        </div>
    );
};

export default LogInManager;