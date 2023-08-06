import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/comics.css";
import axios from "axios";

export default function Hero() {
  const [HeroComicses, setHeroComicses] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `site--marvvel-backend--pt5gh4cp8hgd.code.run/comics/${id}`
        );
        setHeroComicses(data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log("catch Offer>>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="container ">
      {HeroComicses.map((comics) => {
        return (
          <div key={comics._id}>
            <div>
              <img
                src={
                  comics.thumbnail.path +
                  "/standard_fantastic." +
                  comics.thumbnail.extension
                }
                alt="ComicsImage"
                className="comics-image"
              />
            </div>
            <h2>Name : {comics.title}</h2>
            {comics.description && <p> Description : {comics.description}</p>}
          </div>
        );
      })}
    </div>
  );
}
