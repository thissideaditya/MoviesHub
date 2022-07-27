import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return <nav style={{display:'flex', alignItems:'center', padding:'1rem', color:'#0096FF', alignItems: "center",background:'white'}}>
        <h1>Movies Hub</h1>
        <h2 style={{marginLeft:'2rem'}}>Favourites</h2>
    </nav>
  }
}
