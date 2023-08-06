import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Favorites({ userId, updateFav }) {
  const [favorisData, setFavorisData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get favorite list at first rendering
  try {
    {
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://site--marvvel-backend--pt5gh4cp8hgd.code.run/favorites?id=${userId}`
            );

            setFavorisData(response.data);

            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };

        fetchData();
      }, [updateFav]);
    }
  } catch (error) {
    console.log(error);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="container fav-block">
        {favorisData.map((favitem) => {
          return (
            <div className="fav-card" key={favitem.favId}>
              <div>
                <img
                  src={favitem.favPath}
                  alt="favimage"
                  className="fav-image"
                />
              </div>
              <h2>Name : {favitem.favName}</h2>
              {favitem.favDescription && (
                <p> Description : {favitem.favDescription}</p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
