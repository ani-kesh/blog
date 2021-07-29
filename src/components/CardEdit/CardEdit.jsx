import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { getItems, setItems } from "../../helpers/localStorage";
import { Redirect, Route } from "react-router-dom";
import { Routes } from "../../constants/router";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CommentCard from "../CommentCard/CommentCard";

import {
  getCurrentDateStr,
  getCurrentDateInMilliseconds,
} from "../../helpers/dates";

const useStyles = {
  root: {
    maxWidth: 800,
    width: 800,
    padding: "10px 0px",
    margin: "5px auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  commentContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#C0C0C0",
  },
  loginInput: {
    width: "750px",
    margin: "30px 10px",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    fontSize: "25px",
  },
  label: {
    fontSize: "30px",
    color: "#546e7a",
  },
};

export class CardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUserId: getItems("userId") != null ? Number(getItems("userId")) : "",
      userId:"",
      title: "",
      comment: "",
      status: "pending",
      commentDescription: "",
      subComments: [],
      comments: getItems("comments") != null ? [...getItems("comments")] : [],
    };
  }

  componentDidMount() {
    const comments = this.state.comments;
    let subComments = [];
    if (comments.length > 0) {
      const comment = comments.filter((el) => {
        return el.id === this.props.commentId;
      });

      subComments = [...comment[0].subComments].sort((a, b) => {
        return b.createdOn - a.createdOn;
      });

      this.setState({
        userId:comment[0].userId,
      });
    }

    this.setState({
      title: this.props.title,
      comment: this.props.comment,
      subComments: [...subComments],
    });
  }

  handleTitle = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  };

  handleComment = (ev) => {
    this.setState({
      comment: ev.target.value,
    });
  };

  handleSubComment = (ev) => {
    this.setState({
      commentDescription: ev.target.value,
    });
  };

  handleUpdateComment = () => {
    if (this.state.title.trim() !== "" && this.state.comment.trim() !== "") {
      const comments = this.state.comments;
      if (comments !== null) {
        const updatedComments = comments.map((el) => {
          return el.id === this.props.commentId
            ? { ...el, title: this.state.title, comment: this.state.comment }
            : el;
        });
        setItems("comments", updatedComments);
        this.setState({
          status: "fullfield",
          comments: [...comments],
        });
      }
    }
  };

  handleDelete = () => {
    const comments = this.state.comments;

    const newComments = comments.filter((el) => {
      return el.id !== this.props.commentId;
    });

    setItems("comments", newComments);
    this.setState({ status: "fullfield", comments: [...newComments] });
  };

  handleAddSubComment = () => {
    const comments = this.state.comments;

    if (this.state.commentDescription.trim() !== "") {
      const newComments = comments.map((el) => {console.log(el.userId)
        this.setState({
          userId: el.userId,
        });
        if (el.id === this.props.commentId) {
          if (
            typeof el.subComments !== "undefined" &&
            el.subComments.length > 0
          ) {
            el.subComments.sort((a, b) => {
              return b.createdOn - a.createdOn;
            });
            this.setState({
              subComments: [
                {
                  userId: this.state.loggedUserId,
                  comment: this.state.commentDescription,
                  id: `subCom_${el.subComments.length}${Math.floor(
                    Math.random() * 100000
                  )}`,
                  title: "",
                  createdOnStr: getCurrentDateStr(),
                  createdOn: getCurrentDateInMilliseconds(),
                },
                ...el.subComments,
              ],
            });

            return {
              ...el,
              subComments: [
                ...el.subComments,
                {
                  userId: this.state.loggedUserId,
                  comment: this.state.commentDescription,
                  id: `subCom_${el.subComments.length}${Math.floor(
                    Math.random() * 100000
                  )}`,
                  title: "",
                  createdOnStr: getCurrentDateStr(),
                  createdOn: getCurrentDateInMilliseconds(),
                },
              ],
            };
          } else {
            this.setState({
              subComments: [
                {
                  userId: this.state.loggedUserId,
                  comment: this.state.commentDescription,
                  id: `subCom_${Math.floor(Math.random() * 100000)}`,
                  title: "",
                  createdOnStr: getCurrentDateStr(),
                  createdOn: getCurrentDateInMilliseconds(),
                },
              ],
            });

            return {
              ...el,
              subComments: [
                {
                  userId: this.state.loggedUserId,
                  comment: this.state.commentDescription,
                  id: `subCom_${Math.floor(Math.random() * 100000)}`,
                  title: "",
                  createdOnStr: getCurrentDateStr(),
                  createdOn: getCurrentDateInMilliseconds(),
                },
              ],
            };
          }
        } else return el;
      });
      setItems("comments", [...newComments]);
      this.setState({
        commentDescription: "",
        comments: [...newComments],
      });
    }
  };
  render() {
    if (this.state.status === "fullfield") {
      return <Route render={() => <Redirect to={Routes.blog().path} />} />;
    }

    const { classes } = this.props;
    const disabled = this.state.userId === this.state.loggedUserId? "":"disabled";
    return (
      <Box>
        <Box className={classes.commentContainer}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Box className={classes.label}>Title:</Box>
              <Input
                placeholder="Title"
                onChange={this.handleTitle}
                inputProps={{ "aria-label": "description" }}
                className={classes.margin + " " + classes.loginInput}
                value={this.state.title} 
                {...{disabled}}
              />
              <Box className={classes.label}>Comment:</Box>

              <Input
                placeholder="Comment"
                multiline
                rows={5}
                onChange={this.handleComment}
                inputProps={{ "aria-label": "description" }}
                className={classes.margin + " " + classes.loginInput}
                value={this.state.comment}
                {...{disabled}}/>
            </CardContent>
            <CardActions className={classes.footer}>
              <Button
                onClick={this.handleUpdateComment}
                className={classes.button}
                {...{disabled}}>
                &#10003;
              </Button>
              <Button onClick={this.handleDelete} className={classes.button} disabled>
                &times;
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Box className={classes.label}> Add Comment:</Box>
              <Input
                placeholder="Comment"
                onChange={this.handleSubComment}
                inputProps={{ "aria-label": "description" }}
                className={classes.margin + " " + classes.loginInput}
                value={this.state.commentDescription}
              />
              <CardActions className={classes.footer}>
                <Button
                  onClick={this.handleAddSubComment}
                  className={classes.button}
                  >
                  &#10003;
                </Button>
              </CardActions>
            </CardContent>
          </Card>
          <Box variant="outlined">
            {this.state.subComments.map((el) => {
              return (
                <CommentCard
                  key={Math.random()}
                  date={el.createdOnStr}
                  title={el.title}
                  comment={el.comment}
                  userId={el.userId}
                  id={el.id}
                  noLearnMore={"noLearnMore"}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }
}

CardEdit.protoTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default withStyles(useStyles)(CardEdit);
