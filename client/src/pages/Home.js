import React, { useEffect, useState } from 'react'
import Post from '../components/Post';

const Home = () => {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/post')
      .then(response =>
        response.json()
          .then(posts =>
            setPosts(posts)
          )
      )
  },[])

  return (
    <div className='mb-10 mt-6'>
        {
          posts.length === 0 ?
            <h1 className='text-neutral-400 text-2xl mt-10'>No blogs currently ...</h1> 
          : 
            posts.map(post => (
              <Post {...post} />
            ))
        }
    </div>
  )
}

export default Home