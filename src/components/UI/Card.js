import { Fragment } from "react";
import classes from "./Card.module.css";
import icon from "../../assests/tomato.svg";

const Card = (props) => {
  return (
    <Fragment>
      <div className={classes.card}>
        <div className={classes.movie}>
          <div className={classes["movie-img"]}>
            <img
              className={classes["card-img-top"]}
              src={props.Poster}
              alt="Card cap"
            />
          </div>
          <div className={classes["text-movie-content"]}>
            <div className={classes["title-timeline-genre"]}>
              <div className={classes.col}>
                <h2>{props.Title}</h2>
                <div>
                  <p className={classes.details}>
                    <span className={classes.details__rated}>{props.Rated}</span>
                    <span className={classes.details__release}>{props.Released}</span>
                    <span className={classes.details__genre}>{props.Genre}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.rating}>
              <div className={classes["imdb-rating"]}>
                <ul>
                  <li>
                    <p>IMDb</p>
                  </li>

                  <li>
                    <span className={classes["imdb-value"]}>
                      {props.Rating}
                    </span>
                  </li>
                </ul>
              </div>
              {props.RatingsArray &&
                props.RatingsArray.map((item) =>
                  item.Source.includes("Rotten Tomatoes") ? (
                    <div className={classes["rt-rating"]}>
                      <ul>
                        <li>
                          <img src={icon} alt="RT icon" />
                        </li>

                        <li>
                          <span className={classes["imdb-value"]}>
                            {item.Value}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </div>

            <div className={classes.actors}>
              <div className={classes["actors-column"]}>
                <p className={classes["movie-actors"]}>{props.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
