import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.scss";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, albumsResponse, photosResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts"),
          axios.get("https://jsonplaceholder.typicode.com/albums"),
          axios.get("https://jsonplaceholder.typicode.com/photos")
        ]);

        setPosts(postsResponse.data.slice(0, 5));
        setAlbums(albumsResponse.data.slice(0, 5));
        setPhotos(photosResponse.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="home" className="page">
      <h1>Home Page</h1>

      <section>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
        <Link to="/posts" className="btn">Ver mais</Link>
      </section>

      <section>
        <h2>Albums</h2>
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              <h3>{album.title}</h3>
            </li>
          ))}
        </ul>
        <Link to="/albums" className="btn">Ver mais</Link>
      </section>

      <section>
        <h2>Photos</h2>
        <ul className="photos__list">
          {photos.map(photo => (
            <li className="photos__item" key={photo.id}>
              <h3>{photo.title}</h3>
              <a href={photo.url} target="_blank" rel="noopener noreferrer">
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </a>
            </li>
          ))}
        </ul>
        <Link to="/photos" className="btn">Ver mais</Link>
      </section>
    </div>
  );
};

export default Home;
