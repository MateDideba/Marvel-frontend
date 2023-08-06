import axios from "axios";
import { useState } from "react";

export default function AddFavorite({
  name,
  description,
  path,
  token,
  id,
  userId,
  setUpdateFav,
  updateFav,
}) {
  const [added, setadded] = useState(false);

  const handleClick = async () => {
    setUpdateFav(!updateFav);

    try {
      if (!added) {
        const response = await axios.post(
          "site--marvvel-backend--pt5gh4cp8hgd.code.run/favorite/add",
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
        console.log(response.data);
        setadded(!added);
      } else {
        const response = await axios.delete(
          "site--marvvel-backend--pt5gh4cp8hgd.code.run/favorite/delete",
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

        console.log(response.data);
        setadded(!added);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return !added ? (
    <button onClick={handleClick}> Add to favorite </button>
  ) : (
    <button onClick={handleClick}> Remove from Favorite </button>
  );
}
