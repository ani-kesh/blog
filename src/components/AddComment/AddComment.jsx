import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/router";
import { getItems, setItems } from "../../helpers/localStorage";
import PropTypes from "prop-types";
import CommentBox from "../CommentBox/CommentBox";

import {
  getCurrentDateStr,
  getCurrentDateInMilliseconds,
} from "../../helpers/dates";


export class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      isLogged: Boolean(getItems("isLogged")),
      comment: "",
      title: "",
      createdOnStr: "",
      createdOn: "",
      status: "new",
    };
  }

  componentDidMount() {
    const userId = getItems("userId");
    if (userId !== "null")
      this.setState({
        userId: userId,
      });
  }

  handleAddComment = () => {
    if (this.state.title.trim() !== "" && this.state.comment.trim() !== "") {
      const comments = getItems("comments");
      comments !== null
        ? setItems("comments", [
            ...comments,
            {
              id: `c_${comments.length}${Math.floor(Math.random() * 100000)}`,
              userId: this.state.userId,
              comment: this.state.comment,
              title: this.state.title,
              createdOnStr: getCurrentDateStr(),
              createdOn: getCurrentDateInMilliseconds(),
              subComments:[]
            },
          ])
        : setItems("comments", [
            {
              id: `c_0${Math.floor(Math.random() * 100000)}`,
              userId: this.state.userId,
              comment: this.state.comment,
              title: this.state.title,
              createdOnStr: getCurrentDateStr(),
              createdOn: getCurrentDateInMilliseconds(),
              subComments:[]
            },
          ]);
      this.setState({ status: "sent" });
    }
  };
  handleComment = (ev) => {
    this.setState({ comment: ev.target.value });
  };

  handleTitle = (ev) => {
    this.setState({ title: ev.target.value });
  };
  render() {
    if (this.state.status === "sent")
      return <Redirect to={Routes.blog().path} />;
    if (this.state.isLogged)
      return (
        <CommentBox handleTitle={this.handleTitle} handleComment={this.handleComment} handleAddComment={this.handleAddComment} isTitle={true}/>
      );
    return <Redirect to={Routes.login().path} />;
  }
}

AddComment.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddComment;
