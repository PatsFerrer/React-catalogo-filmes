import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css'
import SearchIcon from './search.svg'
import Footer from './Footer';

const API_URL = 'http://www.omdbapi.com?apikey=2b045c83';

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

                <Footer/>
        </div>
    );
}

export default App;