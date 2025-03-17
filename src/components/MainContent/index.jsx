import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function MainContent({
                                        value,
                                        watchList,
                                        watchHeader,
                                        viewedList,
                                        viewedHeader,
                                        recommendedHeader
                                    }) {
    const navigate = useNavigate();
    const [defaultMovies, setDefaultMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    function getFilmData(id) {
        navigate("/" + id);
    }

    useEffect(() => {
        if (watchList.length === 0 && viewedList.length === 0) {
            fetch('https://www.omdbapi.com/?s=Batman&apikey=186be766')
                .then((response) => response.json())
                .then((data) => {
                    if (data.Search) {
                        setDefaultMovies(data.Search);
                    }
                })
                .catch((error) => console.error("Error fetching default movies:", error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [watchList, viewedList]);

    const isWatchList = value === 0;
    const headerTitle = isWatchList ? watchHeader : viewedHeader;
    const films = isWatchList ? watchList : viewedList;

    return (
        <div className="px-4 md:py-16 py-4">
            <h2 className="md:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-100">
                {headerTitle}
            </h2>
            <h2 className="md:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-100">
                {films.length ? null : recommendedHeader}
            </h2>
            {loading ? (
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading movies...</p>
            ) : films.length === 0 && defaultMovies.length === 0 ? (
                <p className="mt-4 text-gray-600 dark:text-gray-300">No movies found.</p>
            ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(films.length > 0 ? films : defaultMovies).map((film, index) => (
                        <div
                            key={index}
                            onClick={() => getFilmData(film.imdbID)}
                            className="max-w-sm rounded overflow-hidden shadow-lg
                         bg-white dark:bg-gray-800 cursor-pointer
                         transition hover:shadow-xl"
                        >
                            <div className="w-full">
                                <img
                                    src={film.Poster}
                                    alt={film.Title}
                                    className="w-full h-auto aspect-[2/3]"
                                />
                            </div>

                            <div className="px-6 py-4">
                                <h3 className="font-bold text-xl text-center text-gray-800 dark:text-white">
                                    {film.Title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-400 text-center">
                                    {film.Year}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
