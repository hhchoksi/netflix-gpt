import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import { model } from "../utils/gemini";
import { addGptMovieResult } from "../utils/gptSlice";
// import openai from "../utils/openai";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();

        return json.results;
    };

    const handleGptSearchClick = async () => {

        const searchQuery = searchText.current.value;

        if (!searchQuery.trim()) {
            console.log("Please enter a search query");
            return;
        }

        const geminiQuery = `Act as a Movie Recommendation system and suggest some movies from bollywood and hollywood for the query: 
        "${searchQuery}". Only give me names of 5 movies, comma separated like the example result given ahead. 
        Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

        const geminiResults = await model.generateContent(geminiQuery);
        const response = geminiResults.response;
        const textContent = response.text();

        // Split the text content into an array
        const movieArray = textContent.split(',').map(movie => movie.trim());

        const promiseArray = movieArray.map((movie) => searchMovieTMDB(movie));

        const tmdbResults = (await Promise.all(promiseArray)).filter(result => result != null);

        console.log(tmdbResults);

        dispatch(
            addGptMovieResult({ movieNames: movieArray, movieResults: tmdbResults })
        );


        // const gptResults = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: "user",
        //             content: gptQuery
        //         }
        //     ],
        // });

        // console.log(gptResults.choices?.[0]?.message?.content);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form
                className="w-full bg-black grid grid-cols-12 rounded-2xl"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9 rounded-xl"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-xl"
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;