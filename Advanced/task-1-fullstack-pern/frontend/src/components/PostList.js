import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="posts-container">
      <h3>Posts</h3>
      {posts.map(post => (
        <div className="post-card" key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
