import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";

import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");
  const [userId, setuserId] = useState(Cookies.get("id") || "");
  const [updateFav, setUpdateFav] = useState(false);
  const [searchWord, setsearchWord] = useState("");

  return (
    <Router>
      <Header
        userToken={userToken}
        setUserToken={setUserToken}
        setuserId={setuserId}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userToken={userToken}
              userId={userId}
              setUpdateFav={setUpdateFav}
              updateFav={updateFav}
              searchWord={searchWord}
              setsearchWord={setsearchWord}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              userToken={userToken}
              userId={userId}
              setUpdateFav={setUpdateFav}
              updateFav={updateFav}
              searchWord={searchWord}
              setsearchWord={setsearchWord}
            />
          }
        />
        <Route path="hero/:id/" element={<Hero />} />
        <Route
          path="/signup"
          element={<Signup setUserToken={setUserToken} setuserId={setuserId} />}
        />
        <Route
          path="/login"
          element={<Login setUserToken={setUserToken} setuserId={setuserId} />}
        />
        <Route
          path="/favorites"
          element={<Favorites userId={userId} updateFav={updateFav} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
