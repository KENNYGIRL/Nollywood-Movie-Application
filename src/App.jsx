import React from "react";
import { useState, useEffect } from "react";
import searchIcon from "./assets/searchIcon.svg";
import "./App.css";
import NollywoodMovieCard from "./components/NollywoodMovieCard";

const NollywoodAPI_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=90af5b7a";

const App = () => {
  const [searchAnyMovies, setsearchAnyMovies] = useState("");
  const [nollywoodmovies, setNollywoodMovies] = useState([]);

  useEffect(() => {
    searchNollywoodMovies("Batman");
  }, []);

  const searchNollywoodMovies = async (title) => {
    try {
      const response = await fetch(`${NollywoodAPI_URL}&s=${title}`);
      const data = await response.json();
      setNollywoodMovies(data.Search);
    } catch (error) {
      console.log("The searched movie cannot be found");
    }
  };

  const handleClick = () => {
    searchNollywoodMovies(searchAnyMovies);
  };

  const handleChange = (e) => {
    setsearchAnyMovies(e.target.value);
  };

  return (
    <div className="app">
      <h1>NollyWood Movies</h1>

      <div className="search">
        <input
          placeholder="Search for Nollywood Movies"
          value={searchAnyMovies}
          // onChange={(e) => setsearchAnyMovies(e.target.value)}
          onChange={handleChange}
        />
        <img
          className="Search-icon"
          src={searchIcon}
          alt="search-button"
          // onClick={() => searchNollywoodMovies(searchAnyMovies)}
          onClick={handleClick}
        />
      </div>

      {nollywoodmovies?.length > 0 ? (
        <div className="container">
          {nollywoodmovies.map((nollywoodmovie) => (
            <NollywoodMovieCard nollywoodmovie={nollywoodmovie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movie found, Try again with another keyword</h2>
        </div>
      )}

      <div>
        <landingPage />
      </div>
    </div>
  );
};

export default App;
