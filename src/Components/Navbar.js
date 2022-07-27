import React, { Component } from 'react'
import {Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return <nav style={{display:'flex', alignItems:'center', padding:'1rem', color:'#0096FF', alignItems: "center",background:'white'}}>
      <Link to="/" style={{textDecoration:"none"}}>
        <h1>Movies Hub</h1>
      </Link>
      <Link to="/fav" style={{textDecoration:"none"}}>
        <h2 style={{marginLeft:'2rem'}}>Favourites</h2>
      </Link>
    </nav>
  }
}
