import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth, getData, sendData } from '../config/firebase/firebasemethod'



const Dashboard = () => {
  
    // state

  const [blogs , setBlogs] = useState([])
  const [userUid , setUserUid] = useState(null);

  // ref value

  const titleVal = useRef()
  const description = useRef()


  useEffect(()=>{

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const blogsData = await getData("blogs" , user.uid)
        console.log(blogsData)
        setUserUid(user.uid)
        setBlogs([...blogsData])
      } else {
       console.log("user login not");
       
      }
    });
  } , [])


  useEffect(() => {
    async function getUserFromDataBase() {
        let getUserData = await getData("users", userUid)
        console.log(getUserData);
    }
    getUserFromDataBase()
  }, [])

  // user data save firestore

  const userDataFirestore = async (event)=>{
   event.preventDefault();
   console.log(titleVal.current.value);
   console.log(description.current.value);
  
   try {
    const response = await sendData({
      title: titleVal.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid
    }, 'blogs')
    blogs.push({
      title: titleVal.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid
    })
    setBlogs([...blogs])
    console.log(response);


  } catch (error) {
    console.error(error)
  }
   
  
   
  }

  return (
    <>
    
    <div>
      <h1 className='mx-[100px] mt-5 text-2xl'>Dashboard</h1>
    </div>

     {/* input value user    */}
 
    <div className='flex mx-[100px] mt-5'>
      <form onSubmit={userDataFirestore}>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" ref={titleVal} />
      <textarea placeholder="Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-5" ref={description}></textarea><br />
      <button className='btn btn-primary mt-3'>Publish</button>
      </form>
    </div>

    
    <h1 className='mx-[100px] mt-5 text-2xl'>All User Blog</h1>
   

   {/* render items */}

    <div>
     {blogs.length > 0 ? blogs.map((item , index)=>{
     return <div key={item.id} className='card text-black w-96 shadow-xl mt-5 mx-[100px]'>
        <div className="card-body">
       <h1>{item.title}</h1>
       <p>{item.description}</p>
        </div>
      </div>
     }): <h1>No found data:</h1>}
    </div>

    </>
  )
}

export default Dashboard


