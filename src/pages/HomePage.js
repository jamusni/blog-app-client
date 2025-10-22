import { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>All Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ borderBottom: '1px solid #ccc', margin: '15px 0' }}>
            <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
            <p>{post.content.slice(0, 100)}...</p>
            <small>By {post.author?.username}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
