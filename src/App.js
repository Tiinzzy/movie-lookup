import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/front-end/Home';
import Footer from "./components/front-end/Footer";
import Header from './components/front-end/Header';
import MovieClicked from './components/front-end/MovieClicked';

const queryParameters = new URLSearchParams(window.location.search)

export default function App() {
  let movie_id = queryParameters.get("movie_id")

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie-clicked/" element={<MovieClicked movie_id={movie_id} />} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};
