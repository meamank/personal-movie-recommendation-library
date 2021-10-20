/* eslint-disable jsx-a11y/anchor-is-valid */
import classes from "./DetailsCard.module.css";
import { Fragment, useEffect, useState } from "react";
import Pie from "./Pie";
const DetailsCard = (props) => {
  const [watchProviders, setWatchProviders] = useState();

  useEffect(() => {
    if (props.type === "tv") {
      fetch(
        `https://api.themoviedb.org/3/tv/${props.movieId}/watch/providers?api_key=9946edd0e4dde738cebb7417be150866`
      )
        .then((res) => res.json())
        .then((d) => setWatchProviders(d.results));
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${props.movieId}/watch/providers?api_key=9946edd0e4dde738cebb7417be150866`
      )
        .then((res) => res.json())
        .then((d) => setWatchProviders(d.results));
    }
  }, [props.movieId, props.type]);

  const background = `url(https://image.tmdb.org/t/p/w1280/${props.backdrop})`;
  const bgStyle = {
    "--bgImg": background,
  };
  console.log(watchProviders);

  const genres = props.genres;
  return (
    <Fragment>
      {watchProviders && (
        <section className={classes.header}>
          <div className={classes.bgImg} style={bgStyle}>
            <div className={classes.layer}>
              <div className={classes.content}>
                <section className={classes["inner-content"]}>
                  <div className={classes.posterDiv}>
                    <div className={classes.posterImg}>
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${props.poster}`}
                        alt="cover"
                        className={classes.poster}
                      />
                    </div>
                  </div>
                  <div className={classes.details}>
                    <section className={classes.detailsSection}>
                      <div className={classes["title-rated-genre"]}>
                        <h2>
                          {props.title}
                          <span className={classes.release_date}>
                            {`(${props.release_date.slice(0, 4)})`}
                          </span>
                        </h2>
                        <div className={classes.genre_rated}>
                          <span className={classes.certification}></span>
                          <span className={classes.genre}>
                            {genres.map((g) => `${g.name} `)}
                          </span>
                          <span
                            className={classes.runtime}
                          >{`${props.runtime}m`}</span>
                        </div>
                      </div>
                      <div className={classes.rating}>
                        <Pie percentage={props.votes * 10} colour={"#21d07a"} />
                      </div>
                      <div className={classes.description}>
                        <h3 className={classes.tagline}>{props.tagline}</h3>
                        <h3 className={classes.desc}>Description</h3>
                        <div>
                          <p className={classes.overview}>{props.plot}</p>
                        </div>
                      </div>
                      {watchProviders.IN && watchProviders.IN.flatrate ? (
                        <div className={classes.description}>
                          <h3 className={classes.desc}>Streaming On</h3>
                          <div>
                            <img
                              src={`https://image.tmdb.org/t/p/w92/${watchProviders.IN.flatrate[0].logo_path}`}
                              alt="cover"
                              className={classes.streamLogo}
                            />
                          </div>
                        </div>
                      ) : null}
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default DetailsCard;
