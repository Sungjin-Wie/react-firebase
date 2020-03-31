import React from "react";
import { Link } from "react-router-dom";

const Result = props => {
  const { imgName } = props.location.state;
  const url = `https://fir-4-c4862.firebaseapp.com/download?imgName=${imgName}`;

  return (
    <>
      <img src={url} alt="" width="500" height="300" />
      <Link to="/">홈으로</Link>
    </>
  );
};

export default Result;
