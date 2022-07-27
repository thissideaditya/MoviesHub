import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MoviesList from './Components/MoviesList';
import Favourites from './Components/Favourites';
import {BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <>
          <Banner />
          <MoviesList />
          </>
        }/>
        <Route path='/fav' element={<Favourites />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
