import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./styles/signup.css";

export default function Signup({ setUserToken, setuserId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !password) {
      setErrorMessage("Please fill in all fields!");
    } else {
      try {
        const { data } = await axios.post(
          "https://site--marvvel-backend--pt5gh4cp8hgd.code.run/signup",
          {
            username,
            email,
            password,
          }
        );
        console.log(data.username);
        // -- Créer le cookie
        Cookies.set("token", data.token);
        Cookies.set("id", data._id);
        Cookies.set("username", data.username);
        // Changer la val du state
        setUserToken(data.token);
        setuserId(data._id);

        navigate("/");
      } catch (error) {
        console.log("catch>>>", error);
        setErrorMessage(error.response.data.message);
      }
    }
  };
  return (
    <main>
      <div className="container">
        <div className="signup">
          <h1>Sign up</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(event) => {
                // vider le message d'erreur
                setErrorMessage("");
                //   envoyer la valeur entrée dans le champs au state
                setUsername(event.target.value);
              }}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(event) => {
                setErrorMessage("");
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setErrorMessage("");
                setPassword(event.target.value);
              }}
            />

            <button>Sign in</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
