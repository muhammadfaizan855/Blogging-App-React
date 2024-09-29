import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
  
  <div className="navbar bg-primary">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-white">Blogging App</a>
  </div>
      <div className='d-flex justify-center gap-5 mx-5 text-white'>
      <p><Link to=''>Home</Link></p>
      <p><Link to='dashboard'>Dashboard</Link></p>
      <p><Link to='profile'>Profile</Link></p>
      <p><Link to='login'>Login</Link></p>
      <p><Link to='register'>Register</Link></p>
      </div>
     
</div>
    </>

  )
}

export default Navbar