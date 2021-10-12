import { useRef, useEffect, useState, Fragment } from "react";
import useHttp from "../hooks/use-http";
import { addComment } from "../libs/api";
import Loader from "../UI/Loader";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const nameTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    const enteredName = nameTextRef.current.value;

    // optional: Could validate here

    sendRequest({
      commentData: { text: enteredText, name: enteredName },
      movieId: props.movieId,
    });
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {status === "pending" && (
          <div className={classes.loader}>
            <Loader />
          </div>
        )}
        <div className={classes.control} onSubmit={submitFormHandler}>
          <textarea
            id="name"
            rows="1"
            placeholder="Your name"
            ref={nameTextRef}
          ></textarea>
          <textarea
            id="comment"
            rows="3"
            placeholder="Your comment"
            ref={commentTextRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button className="btn">Add Comment</button>
        </div>
      </form>
    </Fragment>
  );
};

export default NewCommentForm;
