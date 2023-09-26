import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/comics.css";
import axios from "axios";
import "./styles/hero.css";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";

//import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HeroComics() {
  const [HeroComicses, setHeroComicses] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--marvvel-backend--pt5gh4cp8hgd.code.run/comics/${id}`
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
    <div className="hero-comics-block">
      <Carousel className="crsl">
        {HeroComicses.map((comics) => {
          return (
            <div className="hero-comics-card" key={comics._id}>
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
              <div className="title-desc">
                <h2>{comics.title}</h2>
                {comics.description && <p>{comics.description}</p>}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
