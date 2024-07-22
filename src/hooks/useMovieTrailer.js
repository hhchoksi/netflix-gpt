import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    const getMovieTrailer = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            API_OPTIONS
        );
        const videos = await data.json();
        const filterResults = videos.results.filter((video) => video.type === "Trailer");
        const trailer = filterResults.length ? filterResults[0] : videos.results[0];
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        !trailerVideo && getMovieTrailer();
    }, []);
};

export default useMovieTrailer;