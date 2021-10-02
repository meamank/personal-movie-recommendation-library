import classes from "./filter.module.css";

const Filter = (props) => {
  return (
    
      <div className= {classes.filter}>
        <select
          name="rating-filter"
          id="rating-filter"
          onChange={props.onChange}
        >
          <option value="">Filter By {props.name}</option>
          {props.filterData.map((item) => (
            <option key= {item} value={item}>{item}</option>
          ))}
        </select>
      </div>
  );
};

export default Filter;
