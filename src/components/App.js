import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Result from "./test/result";
import Search from "./test/search";
import { Main as Admin } from "./admin";
const App = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" component={Search} />
      <Route path="/result" component={Result} />
      <Route path="/admin" component={Admin} />
    </BrowserRouter>
  );
};

export default App;
