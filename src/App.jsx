import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faMagnifyingGlass, faXmark);
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";

import Home from "./pages/Home";
import HeroComics from "./pages/HeroComics";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");
  const [userId, setuserId] = useState(Cookies.get("id") || "");
  const [updateFav, setUpdateFav] = useState(false);
  const [searchWord, setsearchWord] = useState("");
  const [UserfavList, setUserfavList] = useState([]);
  const [data, setdata] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://site--marvvel-backend--pt5gh4cp8hgd.code.run/favorites?id=${userId}`
          );

          const favIdList = [...UserfavList];
          response.data.map((fav) => {
            favIdList.push(fav.favId);
          });
          setUserfavList(favIdList);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updateFav]);

  const baseLocation = location.pathname.match(/\/.*\//);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Router>
      <Header
        searchWord={searchWord}
        setsearchWord={setsearchWord}
        data={data}
        userToken={userToken}
        setUserToken={setUserToken}
        setuserId={setuserId}
        setUserfavList={setUserfavList}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setdata={setdata}
              setUserfavList={setUserfavList}
              UserfavList={UserfavList}
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
              setdata={setdata}
              setUserfavList={setUserfavList}
              UserfavList={UserfavList}
              userToken={userToken}
              userId={userId}
              setUpdateFav={setUpdateFav}
              updateFav={updateFav}
              searchWord={searchWord}
              setsearchWord={setsearchWord}
            />
          }
        />
        <Route path="hero/:id/" element={<HeroComics />} />
        <Route
          path="/signup"
          element={<Signup setUserToken={setUserToken} setuserId={setuserId} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setUserToken={setUserToken}
              setuserId={setuserId}
              updateFav={updateFav}
              setUpdateFav={setUpdateFav}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              setdata={setdata}
              setUserfavList={setUserfavList}
              UserfavList={UserfavList}
              token={userToken}
              userId={userId}
              setUpdateFav={setUpdateFav}
              updateFav={updateFav}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
