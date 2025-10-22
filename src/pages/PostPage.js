import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error('❌ Error loading post:', err));
  }, [id]);

  if (!post)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3">{post.title}</h2>
          <p className="card-text fs-5">{post.content}</p>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <small className="text-muted">
              ✍️ By <strong>{post.author?.username || 'Unknown Author'}</strong>
            </small>
            <small className="text-muted">
              🕓 {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
