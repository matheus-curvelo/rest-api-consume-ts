import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Albums.scss";

interface Album {
  userId: number;
  id: number;
  title: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch albums");
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
    <div id="albums" className="page">
      <h1>Albums Page</h1>
      <ul className="albums__list">
        {albums.map(album => (
          <li className="albums__item" key={album.id}>
            <h2>{album.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
