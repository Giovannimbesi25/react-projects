import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_KEY = '6e6da2e1'
const API_URL = 'http://www.omdbapi.com/?apikey=' + API_KEY
const App = () => {

    const [searchTerm, setSearchTearm] = useState([]);

    const [movies, setMovies] = useState([]);

    //Fetch movies
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        //console.log(data);
        setMovies(data.Search)

    }
    useEffect(() => {
        searchMovies('Avengers')
    }, []);

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search for movies" 
                value = {searchTerm} onChange={(e) => setSearchTearm(e.target.value)}
                />
                
                <img src={SearchIcon} alt="Search"
                onClick={() => searchMovies(searchTerm)}/>
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => <MovieCard movie={movie}/> )}
                    </div>
                ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
                )
            }

            
        </div>
    );
}
export default App;