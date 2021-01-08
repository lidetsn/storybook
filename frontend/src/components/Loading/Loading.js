import React from "react";
import loadingGif from "../../img/loading-arrow3.gif";
const Loading = () => {
  return (
    <div>
      <h5>loading....</h5>
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
