
import { useContext, useState } from 'react';
import { userContext } from '../../App.js';
import { Link, useNavigate } from 'react-router-dom';
import { createUsersWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLogInFrameWork, signInUserWithEmailAndPassword } from './LogInManager.js';





function LogIn() {
    const [logInUser, setLogInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false, 
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: ''

  })
  initializeLogInFrameWork()
  const navigate = useNavigate();
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLogInUser(res);
      navigate('/shipment')
    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLogInUser(res);
      navigate('/shipment')
    })
  }
  const FbSignIn = () => {
    handleFbSignIn()
  }
  
  
  
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
      
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordNumber = /\d{2}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordNumber
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }
  
  const handleSubmit = (e) => {
    // SignUp:
    if( newUser && user.email && user.password){
      createUsersWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        setUser(res);
      })
      .catch(err => setUser(err));
    }

    if(!newUser && user.email && user.password) {
      signInUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        if(res.success === true) {
          navigate('/shipment')
        }
        setUser(res);
        setLogInUser(res);
      })
      .catch( err =>{
        console.log(err);
        setUser(err);
      })
    }
    e.preventDefault()
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={FbSignIn }>Sign in using Facebook</button>
      {user.isSignedIn && <div>
        <p>Welcome, {user.name}</p>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt="" />

      </div>
      }


      <h1>Our Own Authentication </h1> 
      <label htmlFor="newUser"><input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" /> New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name='name' type="text" placeholder='Your Name' onBlur={handleBlur} />}
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email Address' required/> <br />
        <input type="password" onBlur={handleBlur} placeholder='Your Password' name="password" required />
        <br />
        <input type="submit" value={newUser? 'Sign up': 'Sign in'} />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && 
      <div style={{color: 'green'}}> 
        <h3>{newUser &&'User Created Successfully'}</h3>
        <button onClick={ () => navigate('/login')}>Please Sign In</button>
      </div>}
      

    </div>
  );
    }

export default LogIn;
