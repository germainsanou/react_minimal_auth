import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/AuthContext'

export default function Dashboard() {
  const [posts, setposts] = useState(null)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    setposts(posts.data)
    // console.log(posts);
  }

  return <div>
    {posts == null ? <div>Loading...</div> : <div>
      {posts.map(post => <div key={post.id}>
        <h3>{post.title}</h3>
      </div>)}
    </div>}
  </div>
}
