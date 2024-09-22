import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-center gap-5 mt-5 flex-wrap'>
      <p><Link to=''>Home</Link></p>
      <p><Link to='dashboard'>Dashboard</Link></p>
      <p><Link to='profile'>Profile</Link></p>
      <p><Link to='login'>Login</Link></p>
      <p><Link to='register'>Register</Link></p>



    </div>
    </>

  )
}

export default Navbar