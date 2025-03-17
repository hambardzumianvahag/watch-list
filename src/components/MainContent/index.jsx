import { useNavigate } from "react-router";

export default function MainContent({ value, watchList, watchHeader, viewedList, viewedHeader }) {
  const navigate = useNavigate();

  function getFilmData(id){
    navigate('/'+id)
  }
  return (
    <div className="px-4 md:py-16 py-4">
      <h2 className="md:text-4xl font-bold">{!value ? watchHeader : viewedHeader}</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {value === 0 && watchList.length > 0 ?  (
          watchList?.map((film, index) => (
            <div onClick={()=>getFilmData(film.imdbID)} key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <img className="w-full h-48 object-cover" src={film.Poster} alt={film.Title} />
              <div className="px-6 py-4">
                <h3 className="font-bold text-xl text-center text-gray-800 dark:text-white">{film.Title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-center">{film.Year}</p>
                <p className="text-gray-600 dark:text-gray-300 text-center">{film.Actors}</p>
              </div>
            </div>
          ))
        ) : value === 0 ? null : viewedList.length > 0 ? (
          viewedList.map((film, index) => (
            <div onClick={()=>getFilmData(film.imdbID)} key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <img className="w-full h-48 object-cover" src={film.Poster} alt={film.Title} />
              <div className="px-6 py-4">
                <h3 className="font-bold text-xl text-center text-gray-800 dark:text-white">{film.Title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-center">{film.Year}</p>
                <p className="text-gray-600 dark:text-gray-300 text-center">{film.Actors}</p>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
