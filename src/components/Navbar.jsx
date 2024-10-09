import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase/firebasemethod';

const Navbar = () => {
  

  const [userLogin , setUserLogin] = useState(false);
 
  const navigate = useNavigate()
  
  useEffect(()=>{

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        
        console.log(uid);
        setUserLogin(true)
      } else {
       console.log("user login not");
       
      }
    });
  } , [])


  const LoginBtn = ()=>{
    
    navigate("/login")
  }

  const userLogout = ()=>{
    signOut(auth)
    .then(() => {
      setUserLogin(false)
      navigate('/login')  
    }).catch((error) => {
      alert("err" , error);
    });    
  }

  return (
    <>
  
  <div className="navbar bg-primary">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-white">Blogging App</a>
  </div>
      <div>
     {userLogin ? (
      <div className='flex justify-center gap-5 mx-5 text-white'>
      <p><Link to=''>Home</Link></p>
      <p><Link to='dashboard'>Dashboard</Link></p>
      <p><Link to='profile'>Profile</Link></p>
      <button onClick={userLogout}>Logout</button>
      </div>
     ) : 
     <button className='btn mx-[30px]' onClick={LoginBtn}>Login</button>}
      </div>
     
</div>
    </>

  )
}

export default Navbar