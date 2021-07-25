import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/router";
import CommentCard from "../CommentCard/CommentCard";
import { getItems } from "../../helpers/localStorage";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      isLogged:Boolean(getItems("isLogged"))
    };
  }
  render(){
    if(this.state.isLogged)
    return <><CommentCard/></>;
    return <Redirect to={Routes.login(this.state.userId).path} />;
  }
}
