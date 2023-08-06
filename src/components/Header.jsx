import "../pages/styles/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header({ userToken, setUserToken, setuserId }) {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container header-block">
        <Link to="/">
          <div>
            <img src="src/assets/marvel-logo.svg" alt="" />
          </div>
        </Link>
        <div className="navigation">
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
        </div>
        <div>
          {userToken ? (
            <div className="authent-block">
              <div className="FavBt">
                <Link to="/favorites">Favoris</Link>
              </div>
              <button
                className="disconnectBt"
                onClick={() => {
                  setUserToken("");
                  setuserId("");

                  Cookies.remove("token");
                  Cookies.remove("id");
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="to-authent-block">
              <div className="sinLog">
                <Link to="/signup">S'inscrire</Link>
              </div>
              <div className="sinLog">
                <Link to="/login">Se connecter</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
