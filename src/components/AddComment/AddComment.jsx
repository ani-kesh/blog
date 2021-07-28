import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/router";
import { getItems, setItems } from "../../helpers/localStorage";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import {
  getCurrentDateStr,
  getCurrentDateInMilliseconds,
} from "../../helpers/dates";

const useStyles = (theme) => ({
  loginContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    width: "800px",
    margin: "10px auto",
    padding: "20px",
  },
  loginInput: {
    width: "800px",
    margin: "30px 10px",
  },
  button: {
    backgroundColor: "#546e7a",
    color: "white",
    padding: "10px 25px",
  },
});

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
            },
          ])
        : setItems("comments", [
            {
              id: `c_${comments.length}${Math.floor(Math.random() * 100000)}`,
              userId: this.state.userId,
              comment: this.state.comment,
              title: this.state.title,
              createdOnStr: getCurrentDateStr(),
              createdOn: getCurrentDateInMilliseconds(),
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
    const { classes } = this.props;
    if (this.state.status === "sent")
      return <Redirect to={Routes.blog().path} />;
    if (this.state.isLogged)
      return (
        <>
          <div className={classes.loginContainer}>
            <Input
              placeholder="Title"
              onChange={this.handleTitle}
              inputProps={{ "aria-label": "description" }}
              className={classes.margin + " " + classes.loginInput}
            />
            <TextField
              id="standard-multiline-static"
              label=""
              multiline
              rows={4}
              onChange={this.handleComment}
              placeholder="Comment"
              className={classes.margin + " " + classes.loginInput}
            />
            <Button
              variant="contained"
              onClick={this.handleAddComment}
              className={classes.button}
            >
              Add
            </Button>
          </div>
        </>
      );
    return <Redirect to={Routes.login().path} />;
  }
}

AddComment.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(AddComment);
