import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, getData } from '../config/firebase/firebasemethod'

const Profile = () => {
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    onAuthStateChanged(auth , async (user) => {
      if (user) {
        const uid = user.uid;
        const userData = await getData("users", uid); 
        setUserProfile(userData);
        setLoading(false);
      } else {
        console.log("User not logged in");
      }
    });
  })

  if(loading){
    return <p>Loading...</p>
  }
  
  return (
    <>
    <div>
      <h1 className='mx-[100px] mt-5 text-2xl'>Profile</h1>
    </div>

    <div className="profile-container">
      {userProfile ? (
        <>
          <h1>User Profile</h1>
          <img src={userProfile.profilePic} alt="Profile" className="w-32 h-32 rounded-full" />
          <h2>Name: {userProfile.name}</h2> {/* Assuming you have a name field */}
          <h2>Email: {userProfile.email}</h2> {/* Assuming you have an email field */}
        </>
      ) : (
        <p>No user data found</p>
      )}
    </div>

    </>
  )
}

export default Profile