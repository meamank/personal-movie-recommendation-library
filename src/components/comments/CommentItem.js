import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  return (
    <li className={classes.item}>
      <p>{props.text} - <span className= {classes.name}>{props.name}</span> </p>
    </li>
  );
};

export default CommentItem;
