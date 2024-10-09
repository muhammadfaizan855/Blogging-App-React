import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth, getData, loginUser, sendData } from '../config/firebase/firebasemethod'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../config/firebase/firebaseconfig'


const Dashboard = () => {
  
    // state

  const [blogs , setBlogs] = useState([])
  const [userUid , setUserUid] = useState(null);
  const [image , setImage] = useState(null);



  // ref value

  const titleVal = useRef()
  const description = useRef()


  useEffect(()=>{
    const listImages = async () => {
          

      const imagesRef = ref(storage, `users/`); // Adjust the path as needed
      try {
        const result = await listAll(imagesRef);        
        const imageUrls = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            
            return url;
          })
        );
        console.log(imageUrls); // Array of image URLs
        setImage(imageUrls)
        return imageUrls;
      } catch (error) {
        console.error('Error listing images:', error);
      }
    };
    listImages()
// ....
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        console.log(user.email);
        const blogsData = await getData("blogs" , user.uid)
        console.log(blogsData)
        
        // setUserUid(user.uid)
        // setBlogs([...blogsData])
      } else {
       console.log("user login not");
       
      }
    });
  } , [])


  // useEffect(() => {
  //   async function getUserFromDataBase() {
  //       let getUserData = await getData("blogs", userUid)
  //       console.log(getUserData);
  //   }
  //   getUserFromDataBase()
  // }, [])

  // user data save firestore

  const userDataFirestore = async (event)=>{
   event.preventDefault();
   console.log(titleVal.current.value);
   console.log(description.current.value);
  console.log(loginUser.userName);
  
   try {
    const response = await sendData({
      title: titleVal.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid,
            email : auth.currentUser.email,
            userName : auth.currentUser.userName
    }, 'blogs')
    blogs.push({
      title: titleVal.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid,
      email : auth.currentUser.email,
      userName : auth.currentUser.userName
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
    <img src={image} alt="" />
   

   {/* render items */}

    <div>
     {blogs.length > 0 ? blogs.map((item , index)=>{
     return <div key={item.id} className='card text-black w-96 shadow-xl mt-5 mx-[100px]'>
        <div className="card-body">
          <h1>{item.email}</h1>
          <h1>{item.userName}</h1>
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


