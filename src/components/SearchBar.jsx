import "../pages/styles/searchbar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({
  data,
  searchWord,
  setsearchWord,
  location,
}) {
  const [inputWord, setinputWord] = useState("");

  const onChange = (event) => {
    setsearchWord(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setsearchWord(searchTerm);
  };

  return (
    <div className="search">
      <div className="search-container">
        <div className="search-inner">
          {location === "/" ? (
            <input
              type="text"
              placeholder="Search your prefered charachters"
              value={searchWord}
              onChange={onChange}
            />
          ) : location === "/comics" ? (
            <input
              type="text"
              placeholder="Search your prefered comics"
              value={searchWord}
              onChange={onChange}
            />
          ) : null}
          <FontAwesomeIcon className="glass" icon="magnifying-glass" />
        </div>
        {/*---------------- dropDown----------------------- */}
        <div className="dropdown">
          {data &&
            data
              .filter((item) => {
                const searchTerm = searchWord.toLowerCase();

                if (item.name) {
                  const name = item.name.toLowerCase();
                  return (
                    searchTerm &&
                    name.startsWith(searchTerm) &&
                    name !== searchTerm
                  );
                } else {
                  const name = item.title.toLowerCase();
                  return (
                    searchTerm &&
                    name.startsWith(searchTerm) &&
                    name !== searchTerm
                  );
                }
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.name)}
                  className="dropdown-row"
                  key={item._id}
                >
                  {item.name ? item.name : item.title}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
