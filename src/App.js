import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from './components/front-end/Body';
import MovieClicked from './components/front-end/MovieClicked';

export default function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/Home" element={<Body />} />
      <Route path="/Movie_Clicked" element={<MovieClicked />} />
      <Route path='*' element={<h3>Error</h3>} />
    </Routes>
  </BrowserRouter>

  return (
    <>
      <Body />
    </>
  );
};
