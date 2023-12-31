import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";

export default function Login({
  setUserToken,
  setuserId,
  updateFav,
  setUpdateFav,
  setUsrname,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Missing email or password!");
    } else {
      try {
        const { data } = await axios.post(
          "https://site--marvvel-backend--pt5gh4cp8hgd.code.run/login",
          {
            email: email,
            password: password,
          }
        );

        //console.log(data.username);
        // enregistrer le cookie
        Cookies.set("token", data.token);
        Cookies.set("id", data._id);
        Cookies.set("username", data.username);

        // changer la valeur du state
        setUserToken(data.token);
        setuserId(data._id);
        setUpdateFav(!updateFav);
        setUsrname(data.username);

        // naviguer vers la page d'accueil
        navigate("/");
      } catch (error) {
        console.log("catch>>", error);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <main>
      <div className="container ">
        <div className="login">
          <h1>Log in</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                // vider le message d'erreur
                setErrorMessage("");
                // envoyer la valeur entrée dans le champs au state
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setErrorMessage("");
                setPassword(event.target.value);
              }}
            />

            <button>Log in</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
