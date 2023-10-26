import "../pages/styles/header.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useEffect, useReducer, useState } from "react";
export default function Header({
  userToken,
  setUserToken,
  setuserId,
  setUserfavList,
  data,
  searchWord,
  setsearchWord,
  username,
  setUsername,
}) {
  const [ReloadFlag, setReloadFlag] = useState();
  const [clicked, setClicked] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleclicked = () => {
    setClicked(!clicked);
  };

  const handleclick = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    setReloadFlag(true);
  }, []);

  const baseLocation = location.pathname.match(/\/.*\//);

  if (baseLocation) {
    if (baseLocation[0] === "/hero/") {
      const divElement = document.querySelector(".search");
      if (divElement != null) {
        divElement.classList.add("hidden");
      }
    }
  } else if (location.pathname === "/favorites") {
    const divElement = document.querySelector(".search");
    if (divElement) {
      console.log(divElement);
      divElement.classList.add("hidden");
    }
  } else if (
    (location.pathname === "/login") |
    (location.pathname === "/signup")
  ) {
    const divElement = document.querySelector(".search");
    if (divElement) {
      console.log(divElement);
      divElement.classList.add("hidden");
    }
  } else {
    const divElement = document.querySelector(".search");
    if (divElement != null) {
      divElement.classList.remove("hidden");
    }
  }

  return (
    <header>
      <div className="header-block">
        <div>
          <Button
            style={{
              backgroundImage:
                "url('https://cdn.registerdisney.go.com/v4/asset/bundler/MARVEL/v4/images/v1/marvel-logo.svg')",
              backgroundSize: "contain",
              width: "160px",
              height: "65px",
              cursor: "pointer",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={handleclick}
          ></Button>
        </div>
        <div className={clicked ? "menu active" : "menu"}>
          <div className="navigation">
            <ul>
              <li className={location.pathname === "/" ? "active" : null}>
                <Link to="/" onClick={handleclicked}>
                  Characters
                </Link>
              </li>
              <li className={location.pathname === "/comics" ? "active" : null}>
                <Link to="/comics" onClick={handleclicked}>
                  Comics
                </Link>
              </li>
              {userToken && (
                <li
                  className={
                    location.pathname === "/favorites" ? "active" : null
                  }
                >
                  <Link to="/favorites" onClick={handleclicked}>
                    Favorites
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {username && <span className="user-name">Hi! {username}</span>}
          <div className="authentification-block">
            <h3>Authentification</h3>
            {userToken ? (
              <div className="authent-block">
                <button
                  className="disconnectBt"
                  onClick={() => {
                    setUserToken("");
                    setuserId("");
                    setUserfavList([]);
                    Cookies.remove("token");
                    Cookies.remove("id");
                    navigate("/");
                    handleclicked();
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="to-authent-block">
                <div className="sinLog">
                  <Link to="/signup" onClick={handleclicked}>
                    Sign up
                  </Link>
                </div>
                <div className="sinLog">
                  <Link to="/login" onClick={handleclicked}>
                    Log in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="mobile" onClick={handleclicked}>
          {clicked ? (
            <i id="bar" className="fixed">
              {clicked ? (
                <FontAwesomeIcon
                  icon="xmark"
                  style={{ color: "red" }}
                  className="fas fa-times"
                />
              ) : (
                <FontAwesomeIcon
                  icon="bars"
                  style={{ color: "red" }}
                  className="fas fa-bars"
                />
              )}
            </i>
          ) : (
            <i id="bar">
              {clicked ? (
                <FontAwesomeIcon
                  icon="xmark"
                  style={{ color: "red" }}
                  className="fas fa-times"
                />
              ) : (
                <FontAwesomeIcon
                  icon="bars"
                  style={{ color: "red" }}
                  className="fas fa-bars"
                />
              )}
            </i>
          )}
        </div>
        <SearchBar
          location={location.pathname}
          data={data.results}
          searchWord={searchWord}
          setsearchWord={setsearchWord}
        />
      </div>
    </header>
  );
}
