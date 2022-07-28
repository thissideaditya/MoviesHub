import React, { Component } from 'react'
import axios from 'axios'

export default class MoviesList extends Component {
    constructor(){
        super();
        this.state = {
            hover:" ",
            parr:[1],
            currPage:1,
            movies:[],
            favMov:[] // this will store ids of the movies which are in favs
        }
    }
    handleEnter = (id) => {
        this.setState({
            hover:id
        })
    }
    handleLeave = () =>{
        this.setState({
            hover:" "
        })
    }
    changeMovies = async () => {
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8bab3cc3dbd7e259ee7306e9bd1499e7&language=en-US&page=${this.state.currPage}`);
        this.setState({
            movies:[...ans.data.results]
        })
    }
    handleNext = () =>{
        let tempArr = [];
        for(let i = 1; i <= this.state.parr.length + 1; i++){
            tempArr.push(i);
        }
        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1
        }, this.changeMovies)
        
    }
    handlePrev = () => {
        let tempArr = [];
        for(let i = 1; i <= this.state.parr.length; i++){
            tempArr.push(i);
        }
        tempArr.pop()
        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage-1
        }, this.changeMovies) 
    }
    handlePageNo = (pageNum) =>{
        this.setState(
          {
            currPage: pageNum,
          },
          this.changeMovies
        );
      }
    handleFavs = (movieObj) => {
        let lsMovies = JSON.parse(localStorage.getItem("movies")) || [];

        if(this.state.favMov.includes(movieObj.id)){
            lsMovies = lsMovies.filter((movie) => movie.id != movieObj.id);
        }
        else lsMovies.push(movieObj);
        console.log(lsMovies)

        localStorage.setItem("movies", JSON.stringify(lsMovies));

        let tempData = lsMovies.map(movieObj => movieObj.id);
        this.setState({
            favMov:[...tempData]
        });
        console.log(this.state.favMov)
        console.log(tempData)
    }

    async componentDidMount(){
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8bab3cc3dbd7e259ee7306e9bd1499e7&language=en-US&page=${this.state.currPage}`);
        this.setState({
            movies:[...ans.data.results]
        })
    }
    render() {
        return (
            <>{
                this.state.movies.length == 0 ? (
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <h3 className='text-center'>
                            <strong>Trending</strong>
                        </h3>
                        <div className='movies-list'>
                            {this.state.movies.map((movieObj) => (
                                <div className="card movie-card" onMouseEnter={() => this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave}>
                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top banner-img" alt="..." style={{ height: "40vh", width: "20vw" }} />
                                    {/* <div className="card-body"> */}
                                    <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                    {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                                    <div className="button-wrapper">
                                        {this.state.hover == movieObj.id && (
                                        <a className="btn btn-primary movie-button" onClick={() => this.handleFavs(movieObj)}>{this.state.favMov.includes(movieObj.id) ? "Remove from WatchList" : "Add to WatchList"}</a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pagination'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={this.handlePrev}>Previous</a>
                                    </li>
                                    {
                                        this.state.parr.map(pageNum => (
                                            <li className="page-item"><a className="page-link" onClick={() => {this.handlePageNo(pageNum)}}>{pageNum}</a></li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={this.handleNext}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
