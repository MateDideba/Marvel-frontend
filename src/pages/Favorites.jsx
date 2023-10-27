import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/favorites.css";
import RemoveFavorite from "../components/RemoveFavorite";

export default function Favorites({
  userId,
  updateFav,
  token,
  setUpdateFav,
  setUserfavList,
}) {
  const [favorisData, setFavorisData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get favorite list at first rendering   setUserfavList={setUserfavList}

  try {
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
  } catch (error) {
    console.log(error);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <h1 className="fav-title">Your Favorites of Marvel</h1>
      <div className="fav-block">
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
              <h2>{favitem.favName}</h2>
              <div className="description">
                {favitem.favDescription ? (
                  <p>{favitem.favDescription}</p>
                ) : (
                  <p>No description</p>
                )}
              </div>

              <RemoveFavorite
                setUserfavList={setUserfavList}
                id={favitem.favId}
                userId={userId}
                updateFav={updateFav}
                token={token}
                setUpdateFav={setUpdateFav}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
