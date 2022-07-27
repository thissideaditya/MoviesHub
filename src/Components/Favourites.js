import React, { Component } from 'react'
import axios from 'axios';

export default class Favourites extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            genre:[],
            currGenre:"All Genre"
        }
    }

    async componentDidMount() {
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8bab3cc3dbd7e259ee7306e9bd1499e7&language=en-US&page=1`);
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
        ans.data.results.map((movieObj) => {
          if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
            genreArr.push(genreId[movieObj.genre_ids[0]]);
          }
        });
    
        genreArr.unshift("All Genre");
        console.log(genreArr);
        this.setState({
          movies: [...ans.data.results],
          genre: [...genreArr],
        });
      }
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
                  aria-current="true">
                  {genre}
                </li>
              )
            )}
          </ul>
                        </div>
                        <div class="col favs-table">
                            <div>
                                <input type="text" placeholder='Search' style={{ width: "90%", borderTopLeftRadius:"0.3rem", borderBottomLeftRadius:"0.3rem" }} />
                                <input type="number" placeholder='5' style={{ width: "10%", borderTopRightRadius:"0.3rem", borderBottomRightRadius:"0.3rem"}} />
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.movies.map((movieObj) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} style={{width:"7rem"}}/>{movieObj.original_title}</td>
                                                <td>{genreId[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button class="btn btn-outline-danger">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
        )
    }
}
