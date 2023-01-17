import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/front-end/Home';


import Body from './components/front-end/Body';
import MovieClicked from './components/front-end/MovieClicked';

const queryParameters = new URLSearchParams(window.location.search)

export default function App() {
  let movie_id = queryParameters.get("movie_id")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie-clicked/" element={<MovieClicked movie_id={movie_id} />} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
