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
      isLogged:Boolean(getItems("isLogged")),
      comments:getItems("comments") !== null?getItems("comments").sort((a,b)=>b.createdOn-a.createdOn):[],
    };
  }

  render(){
    if(this.state.isLogged){      
    return(
      <>
      {this.state.comments.map((el)=>{
         return <CommentCard key={Math.random()} date={el.createdOnStr} title={el.title} comment={el.comment} userId={el.userId} id={el.id}/>
      })}
      </>
    ) 
    }
    return <Redirect to={Routes.login(this.state.userId).path} />;
  }
}
