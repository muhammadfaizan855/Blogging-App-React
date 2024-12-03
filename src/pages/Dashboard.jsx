import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth , getData, sendData } from '../config/firebase/firebasemethod'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../config/firebase/firebaseconfig'
import { getDownloadURL, listAll, ref } from 'firebase/storage';


const Dashboard = () => {
    
    // state

  const [blogs , setBlogs] = useState([])
  const [userUid , setUserUid] = useState(null);
  const [image , setImage] = useState(null)
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



    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const blogsData = await getData("blogs" , auth.currentUser.uid)
        
        console.log(blogsData)
        setUserUid(user.uid)
        setBlogs([...blogsData])
      } else {
      console.log("user login not");
    }
  
  });
  
} , [])



    // user data save firestore

const userDataFirestore = async (event)=>{
  event.preventDefault();
  console.log(titleVal.current.value);
  console.log(description.current.value);
  
  const currentDate = new Date().toISOString(); 

  try {
    const response = await sendData({
      title: titleVal.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid,
      email : auth.currentUser.email,
      date : currentDate,
      image : imageUrls,
  }, 'blogs')
     
  blogs.push({
    title: titleVal.current.value,
    description: description.current.value,
    uid: auth.currentUser.uid,
    email : auth.currentUser.email,
    date : currentDate,
    image : imageUrls,      
    })
  
    setBlogs([...blogs])
    console.log(response);


    } catch (error) {
      console.error(error)
    }
    
  }

    return (
      <>
      
       {/* Dashboard Header */}

      <div className='container mx-[80px] px-2 my-4 text-2xl font-bold'>
        <h1 >Dashboard</h1>
      </div>




      {/* input value user    */}

     <div className='bg-[#F8F9FA]'>
      
     <div className='flex justify-center items-center'>
        <form className='mt-7 bg-white w-[80%] h-[50%] text-center px-2 box-border shadow-md'  onSubmit={userDataFirestore}>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-[75%] mt-8" ref={titleVal} />
        <br />
        <textarea placeholder="Description" className="textarea textarea-bordered textarea-lg w-full max-w-[75%] mt-3" ref={description}></textarea><br />
        <button className='btn btn-primary mt-5 mb-8 text-start'>Publish</button>
        </form>
      </div>

      
      <div className='container mx-[80px] px-2 my-4 text-2xl font-bold'>
        <h1 >My Blog</h1>
      </div>




    {/* render items */}
 
      <div className='flex justify-center items-center '>
      {blogs.length > 0 ? blogs.map((item)=>{
      return <div key={item.id} className='card bg-white w-[80%] h-[50%] text-black  shadow-xl mt-5 mx-auto px-2'>
          <div className="card-body">
          <div className='flex flex-wrap px-5'>
          <img className='border border-rounded' src={image} alt="image" width={45} height={155} />
          <h1 className='mx-3 text-xl'>{item.title}</h1>
          <h2><strong>Date: </strong>{new Date(item.date).toLocaleDateString()}</h2>
          </div>
          {/* <h1><strong>Email : </strong>{item.email}</h1> */}
        <p className='text-gray'> {item.description}</p>
          </div>
        </div>
      }): <h1>No Blog found:</h1>}
      </div>

     </div>
      </>
    )
  }

  export default Dashboard











