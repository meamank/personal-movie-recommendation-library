import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsCard from "../components/UI/DetailsCard";
import Loader from "../components/UI/Loader";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [idDetails, setidDetails] = useState();
  
  const params = useParams();

  const { movieId } = params;

  useEffect(() => {
    
    fetch(
      "https://api.themoviedb.org/3/find/" +
        movieId +
        "?api_key=9946edd0e4dde738cebb7417be150866&language=en-US&external_source=imdb_id"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        for (const key in data) {
          // console.log(key)
          if (data[key].length > 0 && key === "movie_results") {
            data[key].map((item) =>
              fetch(
                `https://api.themoviedb.org/3/movie/${item.id}?api_key=9946edd0e4dde738cebb7417be150866&language=en-US`
              )
                .then((res) => res.json())
                .then((d) => setidDetails(d))
            );
          } else {
            data[key].map((item) =>
              fetch(
                `https://api.themoviedb.org/3/tv/${item.id}?api_key=9946edd0e4dde738cebb7417be150866&language=en-US`
              )
                .then((res) => res.json())
                .then((d) => setidDetails(d))
                
            );
            setIsLoading(false)
          }
        }
      });
  }, [movieId]);
  // const release_date = idDetails.hasOwnProperty("name") ? idDetails.first_air_date : idDetails.release_date
  // console.log(idDetails);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Fragment>
      {idDetails && <DetailsCard
        title={
          idDetails.hasOwnProperty("name") ? idDetails.name : idDetails.title
        }
        type= {idDetails.hasOwnProperty("name") ? "tv" : "movie"}
        movieId= {idDetails.id}
        poster={idDetails.poster_path}
        backdrop={idDetails.backdrop_path}
        tagline={idDetails.tagline}
        rating={idDetails.vote_average}
        genres={idDetails.genres}
        plot={idDetails.overview}
        release_date = {idDetails.hasOwnProperty("name") ? idDetails.first_air_date : idDetails.release_date}
        runtime = {idDetails.hasOwnProperty("name") ? idDetails.episode_run_time[0] : idDetails.runtime}
        votes = {idDetails.vote_average}
      />}
    </Fragment>
  );
};

export default Details;
