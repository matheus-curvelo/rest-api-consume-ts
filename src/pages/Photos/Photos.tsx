import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photos.scss";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        setPhotos(response.data.slice(0, 100)); // Limitando a 50 fotos
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch photos");
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
    <div id="photos" className="page">
      <h1>Photos Page</h1>
      <ul className="photos__list">
        {photos.map(photo => (
          <li className="photos__item" key={photo.id}>
            <a href={photo.url} target="_blank" rel="noopener noreferrer">
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </a>
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
