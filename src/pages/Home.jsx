import { useEffect, useState } from 'react';
import { auth, getAllData } from '../config/firebase/firebasemethod';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  const userDataFromFirestore = async () => {
    const userData = await getAllData("blogs");
    setAllBlogs(userData);
  };

  useEffect(() => {
    userDataFromFirestore ();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User logged in');
      } else {
        console.log('User logged out');
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
  <>
    <div>
     <h1 className='mx-[100px] mt-5 text-2xl'>All Blogs</h1>
     </div>
     <div>
      {allBlogs.length > 0 ? (allBlogs.map((item, index) => (
      <div key={index} className='card text-black w-96 shadow-xl mt-5 mx-[100px]'>
        <div className='card-body'>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        </div>
        </div>))
        ) : (<h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Home;
