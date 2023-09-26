import axios from "axios";
import { useState, useEffect } from "react";

export default function AddFavorite({
  UserfavList,
  setUserfavList,
  name,
  description,
  path,
  token,
  id,
  userId,
  setUpdateFav,
  updateFav,
}) {
  const [added, setadded] = useState({});
  const handleClick = async () => {
    try {
      if (!UserfavList.includes(id)) {
        console.log("here added");
        const response = await axios.post(
          "https://site--marvvel-backend--pt5gh4cp8hgd.code.run/favorite/add",
          {
            id,
            name,
            description,
            path,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data);

        setUserfavList([]);
        setUpdateFav(!updateFav);
      } else {
        console.log("here removed ");
        const response = await axios.delete(
          "https://site--marvvel-backend--pt5gh4cp8hgd.code.run/favorite/delete",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
            data: {
              id,
              userId,
            },
          }
        );

        //console.log(response.data);

        setUserfavList([]);
        setUpdateFav(!updateFav);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return !UserfavList.includes(id) ? (
    <button onClick={handleClick}> Add to favorite </button>
  ) : (
    <button onClick={handleClick}> Remove from Favorite </button>
  );
}
