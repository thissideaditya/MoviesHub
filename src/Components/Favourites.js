import React, { Component } from 'react'
import axios from 'axios';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
      currText: "",
      limit: 5,
      currPage: 1,
    };
  }

  async componentDidMount() {
    // let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8bab3cc3dbd7e259ee7306e9bd1499e7&language=en-US&page=1`);
    let results = JSON.parse(localStorage.getItem("movies"));
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let genreArr = [];
    results.map((movieObj) => {
      if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
        genreArr.push(genreId[movieObj.genre_ids[0]]);
      }
    });

    genreArr.unshift("All Genre");
    console.log(genreArr);
    this.setState({
      movies: [...results],
      genre: [...genreArr],
    });
  }

  handleCurrGenre = (genre) => {
    this.setState({
      currGenre: genre
    })
  }

  handleText = (e) => {
    this.setState({
      currText: e.target.value
    })
  }

  sortPopularityDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...allMovies]
    });
  }
  sortPopularityAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...allMovies]
    });
  }
  sortRatingAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...allMovies]
    });
  }
  sortRatingDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...allMovies]
    });
  }
  handlePageNum = (page) => {
    this.setState({
      currPage:page
    });
  };


  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filteredMovies = this.state.movies;

    if (this.state.currText === "") {
      filteredMovies = this.state.movies;
    } else {
      filteredMovies = filteredMovies.filter((movieObj) => {
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText); //[t,o,p, ,g,u,n, ,m,a,v,e,r,i,c,k]
      });
    }

    if (this.state.currGenre != "All Genre") {
      filteredMovies = filteredMovies.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre
      );
    }

    let numOfPages = Math.ceil(filteredMovies.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= numOfPages; i++) {
      pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit - 1;
    filteredMovies = filteredMovies.slice(si, ei + 1);


    return (
      <div class="row">
        <div class="col-3 favs-list">
          <ul class="list-group">
            {this.state.genre.map((genre) =>
              this.state.currGenre == genre ? (
                <li class="list-group-item active" aria-current="true">
                  {genre}
                </li>
              ) : (
                <li
                  class="list-group-item"
                  aria-current="true" onClick={() => this.handleCurrGenre(genre)}>
                  {genre}
                </li>
              )
            )}
          </ul>
        </div>
        <div class="col favs-table">
          <div>
            <input type="text" placeholder='Search' value={this.state.currText} onChange={this.handleText} style={{ width: "90%", borderTopLeftRadius: "0.3rem", borderBottomLeftRadius: "0.3rem" }} />
            <input type="number" placeholder='5' style={{ width: "10%", borderTopRightRadius: "0.3rem", borderBottomRightRadius: "0.3rem" }} />
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">
                  <i class="fa-solid fa-caret-up" onClick={this.sortPopularityAsc}></i>Popularity<i class="fa-solid fa-caret-down" onClick={this.sortPopularityDesc}></i></th>
                <th scope="col">
                  <i class="fa-solid fa-caret-up" onClick={this.sortRatingAsc}></i>Rating<i class="fa-solid fa-caret-down" onClick={this.sortRatingDesc}></i></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredMovies.map((movieObj) => (
                  <tr>
                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} style={{ width: "6rem" }} />{movieObj.original_title}</td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td><button class="btn btn-outline-danger">Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='pagination'>
          <nav aria-label="Page navigation example">
          <ul class="pagination">
            {pagesArr.map((page) => (
              <li class="page-item">
                <a class="page-link" onClick={() => this.handlePageNum(page)}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
          </div>
        </div>
      </div>
    )
  }
}
