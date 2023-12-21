import { useEffect, useState } from 'react';

import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';


// 2b045c83

const API_URL = 'http://www.omdbapi.com?apikey=2b045c83';

const movie1 = {
    "Title": "Avatar",
    "Year": "2009",
    "imdbID": "tt0499549",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Avatar')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>

                ) : (
                    <div className='empty'>
                        <h1>No movies found</h1>
                    </div>
                )}


        </div>
    );
}

export default App;