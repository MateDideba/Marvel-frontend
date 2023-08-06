import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/comics.css";
import ReactPaginate from "react-paginate";

import SearchBar from "../components/SearchBar";
import AddFavorite from "../components/AddFavorite";

export default function Comics({
  searchWord,
  setsearchWord,
  userId,
  userToken,
  updateFav,
  setUpdateFav,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setsortedData] = useState([]);

  const handlePageChange = (selectedPage) => {
    console.log(selectedPage.selected);
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvvel-backend--pt5gh4cp8hgd.code.run/comics?page=${currentPage}&title=${searchWord}`
        );
        setData(response.data);
        const sortByName = response.data.results.sort((a, b) => {
          return a.title.localeCompare(b.name);
        });

        setsortedData(sortByName);

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
        from="/comics"
        data={data.results}
        searchWord={searchWord}
        setsearchWord={setsearchWord}
      />
      <div className="container comics-block">
        {sortedData.map((comics) => {
          return (
            <div className="comics-card" key={comics._id}>
              <div>
                <img
                  src={
                    comics.thumbnail.path +
                    "/standard_fantastic." +
                    comics.thumbnail.extension
                  }
                  alt="HeroImage"
                  className="hero-image"
                />
              </div>
              <h2>Name : {comics.title}</h2>
              <div className="description">
                {comics.description ? (
                  <p>{comics.description}</p>
                ) : (
                  <p>No description</p>
                )}
              </div>
              <AddFavorite
                updateFav={updateFav}
                setUpdateFav={setUpdateFav}
                userId={userId}
                id={comics._id}
                name={comics.name}
                description={comics.description}
                path={
                  comics.thumbnail.path +
                  "/portrait_xlarge." +
                  comics.thumbnail.extension
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
