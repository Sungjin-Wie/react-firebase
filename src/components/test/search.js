import React, { useState } from "react";
import { Link } from "react-router-dom";
const Search = () => {
  const [val, setVal] = useState("");

  const handleChange = e => {
    setVal(e.target.value);
  };
  return (
    <>
      <input value={val} onChange={e => handleChange(e)} />
      <Link
        to={{
          pathname: "/result",
          state: {
            imgName: val
          }
        }}
      >
        search
      </Link>
    </>
  );
};

export default Search;
