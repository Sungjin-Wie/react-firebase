import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Result from "./result";
import Search from "./search";
const App = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" component={Search} />
      <Route path="/result" component={Result} />
    </BrowserRouter>
  );
};

export default App;
