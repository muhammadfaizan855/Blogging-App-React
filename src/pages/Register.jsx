import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { signUpUser } from '../config/firebase/firebasemethod'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth , db , storage } from '../config/firebase/firebaseconfig'
// import { collection, addDoc } from "firebase/firestore"; 
// import {  uploadBytes , ref , getDownloadURL } from "firebase/storage";
import { signUpUser, uploadImage } from '../config/firebase/firebasemethod';

const Register = () => {
 
  const userName = useRef()
  const email = useRef()
  const password = useRef()
  const profileImage = useRef()
   
  const navigate = useNavigate()

  const userRegisterFromFirebase = async (event) => {
    event.preventDefault()
    
    let userProfileUrl = await uploadImage(profileImage.current.files[0], email.current.value)
    // console.log(userProfileUrl);

    let registerUserData = await signUpUser({
      userName : userName.current.value,
      email : email.current.value,
      password : password.current.value,
      userProfile : userProfileUrl
    
    })
    registerUserData()
    console.log(registerUserData);
    navigate('/login')
      
    
  }

  return (
   <>
   <h1 className='text-center text-3xl mt-5'>Register</h1>
   
   <div className='flex justify-center items-center flex-wrap gap-5 mt-5'>
   
   <form onSubmit={userRegisterFromFirebase}>

   
   <label className="input input-bordered input-primary flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Username" ref={userName} />
</label>


<label className="input input-bordered input-primary flex items-center gap-2 mt-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="email" className="grow" placeholder="Email" ref={email} />
</label>


<label className="input input-bordered input-primary flex items-center gap-2 mt-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder="password"  ref={password}/>
</label>
   
<div className='mt-3'>
<input
  type="file"
  className="file-input file-input-bordered file-input-primary w-full max-w-xs" ref={profileImage}/>
  </div>  

  <div className='text-center mt-3'>
      <span >Already a user ? </span><Link to={'/login'}>Sign In</Link>
      </div> 
   
    <div className='mt-5 text-center'>
      
   <button className='btn btn-primary'>Register</button>
    </div>

   </form>
   </div>
   </>
  )
}

export default Register