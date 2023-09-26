import "../pages/styles/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
export default function Header({
  userToken,
  setUserToken,
  setuserId,
  setUserfavList,
  data,
  searchWord,
  setsearchWord,
}) {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <header>
      <div className="header-block">
        <Link to="/">
          <div>
            <img
              src="https://cdn.registerdisney.go.com/v4/asset/bundler/MARVEL/v4/images/v1/marvel-logo.svg"
              alt=""
            />
          </div>
        </Link>
        <div className="navigation">
          <ul>
            <li className={location.pathname === "/" ? "active" : null}>
              <Link to="/">Characters</Link>{" "}
            </li>
            <li className={location.pathname === "/comics" ? "active" : null}>
              <Link to="/comics">
                Comics{" "}
                <FontAwesomeIcon icon="bars" style={{ color: "#fb1818" }} />
              </Link>
            </li>
            {userToken && (
              <li
                className={location.pathname === "/favorites" ? "active" : null}
              >
                <Link to="/favorites">Favoris</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
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
                }}
              >
                Sing out
              </button>
            </div>
          ) : (
            <div className="to-authent-block">
              <div className="sinLog">
                <Link to="/signup">Sing up</Link>
              </div>
              <div className="sinLog">
                <Link to="/login">Log in</Link>
              </div>
            </div>
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
