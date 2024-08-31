import GptSearchBar from "./GptSearchBar";
import { bg_banner } from "../utils/constants";
import MovieSuggestion from "./MovieSuggestion";

const GptSearch = () => {
    return (
        <div className="h-screen flex items-start justify-center relative">
            <img
                src={bg_banner}
                alt="banner"
                className="fixed inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 w-full px-4 pt-[35%] md:pt-[10%]">
                <GptSearchBar />
                <MovieSuggestion />
            </div>
        </div>
    );
};

export default GptSearch;