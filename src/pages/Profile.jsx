// import React, { useEffect, useState } from 'react'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth, db, getData } from '../config/firebase/firebasemethod'
// import { collection, getDocs, query, where } from 'firebase/firestore'

// const Profile = () => {
  
//   const [userProfileData , setUserProfileData] = useState()
  
//   useEffect(() => {
//   const userDataFirestore =  onAuthStateChanged(auth , async (user)=>{
//        if(user){ 
//        try {
//         const q = query(
//           collection(db, "users"),
//           where("uid", "==", user.uid)
//       );
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//          const userData = doc.data();
//          console.log(userData);
//          setUserProfileData(userData)
//       });
//        } catch (error) {
//         console.log(error);
        
//        }
    

//        const uid = user.uid
//        console.log(uid);
//        const userProfileUrl = await getData("userProfile" , user.uid)
//        console.log(userProfileUrl);
//       //  setUserProfileData(userProfile)
//        }else{
//         console.log("user not login");
        
//        }
//     })
//     return ()=> userDataFirestore();
//   }, [])
  

//   // useEffect(() => {
//   //   const changingInPassword = onAuthStateChanged(auth, async (user) => {
//   //     if (user) {
//   //       try {
//   //         const q = query(collection(db, "users"), where("id", "==", user.uid));
//   //         const querySnapshot = await getDocs(q);
//   //         querySnapshot.forEach((doc) => {
//   //           const userData = doc.data();
//   //           console.log(userData);
//   //           setUserProfileData(userData);
//   //         });
//   //       } catch (error) {
//   //         console.log('Error fetching user data:', error);
//   //       }
//   //     } else {
//   //       console.log('User is logged out');
//   //     }
//   //   });

//   //   return () => changingInPassword();
//   // }, []);



// //   useEffect(()=>{

// //     onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         const uid = user.uid;
// //         console.log(uid);
// //         const blogsData = await getData("blogs" , user.uid)
// //         console.log(blogsData)
// //         // setUserUid(user.uid)
// //         setUserProfileData(blogsData)
// //       } else {
// //       console.log("user login not");
// //     }
  
// //   });
  
// // } , [])

//   return (
//     <>
//     <h1>Profile</h1>
    
//     </>
//   )
// }

// export default Profile










import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { storage } from '../config/firebase/firebaseconfig';

const Profile = () => {
 
  const [image , setImage] = useState(null)

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

  } , [])
 
  return (
  <>
    <div>Profile</div>
  
   {image ? image.map((item)=>{
    return <div key={item.id}>
    <img src={image} alt="image" />
    
    </div>
   }) : <h1>Loading...</h1>}
  </>
  )
}

export default Profile