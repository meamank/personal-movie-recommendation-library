import { Fragment, useEffect, useState } from "react";
import Filter from "../components/filters/Filter";
import Card from "../components/UI/Card";
import Loader from "../components/UI/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState();
  const [filteredYear, setFilteredYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredRating, setFilteredRating] = useState([]);
  // const [filteredGenre, setFilteredGenre] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch(
      "https://movie-reco-dca89-default-rtdb.asia-southeast1.firebasedatabase.app/result.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        const response2 = data.map((item) =>
          fetch(`https://www.omdbapi.com/?i=${item.url}&apikey=a35efbe5`).then(
            (res) => res.json()
          )
        );
        // console.log(response2)
        Promise.all(response2).then((fetchedMovie) => {
          setMovieData(fetchedMovie.map((item) => item));
          const uniqueFilteredYears = [
            ...new Set(fetchedMovie.map((item) => item.Year.slice(0, 4))),
          ];
          setFilteredYear(uniqueFilteredYears.sort((a, b) => b - a));
          const uniqueFilteredRating = [
            ...new Set(fetchedMovie.map((item) => item.imdbRating)),
          ];
          setFilteredRating(uniqueFilteredRating.sort((a, b) => b - a));
          setIsLoading(false);
        });
      });
  }, []);

  if (isLoading) {
    return <div className= "loading"><Loader /></div>;
  }
  // console.log(filterYear)

  const filteredGenre = [
    "Action",
    "Crime",
    "Horror",
    "Drama",
    "Adventure",
    "Comedy",
    "Thriller",
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "History",
    "Mystery",
  ].sort((a, b) => b - a);

  const selectYear = (event) => {
    setSelectedYear(event.target.value);
  };
  const selectRating = (event) => {
    setSelectedRating(event.target.value);
  };
  const selectGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
      <Fragment>
        <div className="filter-container">
          <Filter name="Year" onChange={selectYear} filterData={filteredYear} />
          <Filter
            name="Rating"
            onChange={selectRating}
            filterData={filteredRating}
          />
          <Filter
            name="Genre"
            onChange={selectGenre}
            filterData={filteredGenre}
          />
          
        </div>
        <div className= 'filter-bar'></div>
        <div className="movie-main-container">
          {movieData &&
            movieData
              .sort((a, b) => b.imdbRating - a.imdbRating)
              .filter((item) => {
                return (
                  item.Year.includes(selectedYear) &&
                  item.imdbRating.includes(selectedRating) &&
                  item.Genre.includes(selectedGenre)
                );
              })
              .map((d) => {
                return (
                  <Card
                    key={d.imdbID}
                    id= {d.imdbID}
                    Poster={d.Poster}
                    Title={d.Title}
                    Rated={d.Rated}
                    Released={d.Year}
                    Genre={d.Genre}
                    Rating={d.imdbRating}
                    Actors={d.Actors}
                    RatingsArray={d.Ratings}
                    movieData={movieData}
                  />
                );
              })}
        </div>
      </Fragment>
    );

};

export default Home;
