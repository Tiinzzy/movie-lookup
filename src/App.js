import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/front-end/Home';
import Footer from "./components/front-end/Footer";
import Header from './components/front-end/Header';
import MovieClicked from './components/front-end/MovieClicked';
import GenreResult from "./components/front-end/GenreResult";
import CountryResult from "./components/front-end/CountryResult";

const queryParameters = new URLSearchParams(window.location.search)

export default function App() {
  let movie_id = queryParameters.get("movie_id");
  let selected_genre = queryParameters.get("selected_genre");
  let selected_country = queryParameters.get("selected_country");
  console.log(selected_country)

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie-clicked/" element={<MovieClicked movie_id={movie_id} />} />
          <Route path="/genre-result" element={<GenreResult selected_genre={selected_genre}/>} />
          <Route path="/country-result" element={<CountryResult selected_country={selected_country}/>} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};
