import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/router";
import { getItems, setItems } from "../../helpers/localStorage";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getCurrentDate } from "../../helpers/dates";

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
});

export class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      isLogged: Boolean(getItems("isLogged")),
      comment: "",
      title: "",
      createdOn: "",
      status: "new"
    };
  }

  componentDidMount() {
    const userId = 0;
    if (userId != null) {
      const users = getItems("users");
      const user = users.filter((el) => {
        return userId === el.id;
      });
    }
  }

  handleAddComment = () => {
    if (this.state.title.trim() !== "" && this.state.comment.trim() !== "") {
      const comments = getItems("comments");
      comments !== null
        ? setItems("comments", [
            ...comments,
            {
              userId: "",
              comment: this.state.comment,
              title: this.state.title,
              createdOn: getCurrentDate(),
            },
          ])
        : setItems("comments", [
            {
              userId: "",
              comment: this.state.comment,
              title: this.state.title,
              createdOn: getCurrentDate(),
            },
          ]);
          this.setState({status:"sent"});
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
    if(this.state.status === "sent")
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
            <Button variant="outlined" onClick={this.handleAddComment}>
              Add
            </Button>
          </div>
        </>
      );
    return <Redirect to={Routes.login().path} />;
  }
}

export default withStyles(useStyles)(AddComment);
