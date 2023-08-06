import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/home.css";
import ReactPaginate from "react-paginate";

import AddFavorite from "../components/AddFavorite";
import SearchBar from "../components/SearchBar";

export default function Home({
  userToken,
  userId,
  updateFav,
  setUpdateFav,
  searchWord,
  setsearchWord,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [searchreq, setsearchreq] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  console.log(searchWord);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvvel-backend--pt5gh4cp8hgd.code.run/characters?page=${currentPage}&name=${searchWord}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, searchWord]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <SearchBar
        data={data.results}
        searchWord={searchWord}
        setsearchWord={setsearchWord}
      />
      <div className="container hero-block">
        {data.results.map((hero) => {
          return (
            <div className="hero-card" key={hero._id}>
              <Link to={`/hero/${hero._id}`}>
                <div>
                  <img
                    src={
                      hero.thumbnail.path +
                      "/portrait_xlarge." +
                      hero.thumbnail.extension
                    }
                    alt="HeroImage"
                    className="hero-image"
                  />
                </div>
                <h2>Name : {hero.name}</h2>
                <div className="description">
                  {hero.description ? (
                    <p> Description : {hero.description}</p>
                  ) : (
                    <p>No description</p>
                  )}
                </div>
              </Link>
              <AddFavorite
                updateFav={updateFav}
                setUpdateFav={setUpdateFav}
                userId={userId}
                id={hero._id}
                name={hero.name}
                description={hero.description}
                path={
                  hero.thumbnail.path +
                  "/portrait_xlarge." +
                  hero.thumbnail.extension
                }
                token={userToken}
              />
            </div>
          );
        })}
      </div>

      <div>
        <ReactPaginate
          pageCount={Math.ceil(data.count / data.limit)}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          activeLinkClassName="active"
          previousClassName="prev-next"
          nextClassName="prev-next"
        />
      </div>
    </main>
  );
}
