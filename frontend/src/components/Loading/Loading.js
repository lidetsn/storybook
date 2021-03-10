import React from "react";
import loadingGif from "../../img/loading-arrow3.gif";
import classes from "./loading.module.css"
const Loading = () => {
  return (
    <div className={classes.Spinner}>
      <h5>loading....</h5>
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
