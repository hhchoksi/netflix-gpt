import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);

    const getPopularMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/popular?page=3",
            API_OPTIONS
        );
        const movies = await data.json();
        dispatch(addPopularMovies(movies.results));
    };

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);
};

export default usePopularMovies;