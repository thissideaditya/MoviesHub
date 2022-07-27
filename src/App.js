import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MoviesList from './Components/MoviesList';
import Favourites from './Components/Favourites';

function App() {
  return (
    <React.Fragment>
      {/* <Navbar/>
      <Banner/>
      <MoviesList/> */}
      <Navbar/>
      <Favourites/>
    </React.Fragment>
  )
}

export default App;
