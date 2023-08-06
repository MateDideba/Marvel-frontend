import "../pages/styles/searchbar.css";
import { useState } from "react";

export default function SearchBar({ data, searchWord, setsearchWord, from }) {
  const [inputWord, setinputWord] = useState("");

  const onChange = (event) => {
    setsearchWord(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setsearchWord(searchTerm);
  };

  return (
    <div className="search container ">
      <div className="search-container">
        <div className="search-inner">
          {from ? (
            <input
              type="text"
              placeholder="Search your prefered comics"
              value={searchWord}
              onChange={onChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Search your prefered characters"
              value={searchWord}
              onChange={onChange}
            />
          )}
        </div>
        <div className="dropdown">
          {data
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
            .slice(0, 3)
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
