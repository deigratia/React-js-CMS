import React from "react"
import { Route } from "react-router-dom";
import Login from "../components/Login";
import List from "../components/List";
import User from "../components/User";

const Router = () => {
    return (
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/list" exact component={List} />
        <Route path="/user" exact component={User} />
      </div>
    );
}

export default Router;