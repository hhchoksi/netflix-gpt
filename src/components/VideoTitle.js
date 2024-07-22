const VideoTitle = ({title, overview}) => {
    return (
        <div className="w-full aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            <p className="py-6 w-3/4 text-lg">{overview}</p>
            <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
            ▶️ Play
            </button>
            <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
            More Info
            </button>
        </div>
    );
};

export default VideoTitle;