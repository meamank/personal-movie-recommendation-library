import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../libs/api";
import CommentsList from "./CommentsList";
import Loader from "../UI/Loader";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { movieId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(movieId);
  }, [movieId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(movieId);
  }, [sendRequest, movieId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          movieId={movieId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
