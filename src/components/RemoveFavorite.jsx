import axios from "axios";

function RemoveFavorite({
  setUserfavList,
  id,
  userId,
  updateFav,
  token,
  setUpdateFav,
}) {
  const handleClick = async () => {
    console.log(userId);
    try {
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

      console.log(response.data);
      setUserfavList([]);
      setUpdateFav(!updateFav);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return <button onClick={handleClick}>Remove Favorite</button>;
}

export default RemoveFavorite;
