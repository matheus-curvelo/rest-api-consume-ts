import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Posts.scss";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="posts" className="page">
      <h1>Posts Page</h1>
      <ul className="posts__list">
        {posts.map(post => (
          <li className="posts__item" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
