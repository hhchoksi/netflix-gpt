import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { useState } from "react";

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    const [isMuted, setIsMuted] = useState(true);

    useMovieTrailer(movieId);

    return (
        <div className=" w-full relative">
            <iframe
                className="w-full aspect-video"
                src={
                    "https://www.youtube.com/embed/" +
                    trailerVideo?.key +
                    "?&autoplay=1&mute=1&loop=1"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
        </div>
    )
};

export default VideoBackground;