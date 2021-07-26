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

const useStyles = {
  root: {
    maxWidth: 800,
    width: 800,
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
    width: "100vw",
  },
  loginInput: {
    width: "800px",
    margin: "30px 10px",
  },
};

export class CardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      status: "pending",
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      title: this.props.title,
      comment: this.props.comment,
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

  handleUpdateComment = () => {
    if (this.state.title.trim() !== "" && this.state.comment.trim() !== "") {
      const comments = getItems("comments");
      if (comments !== null) {
        const updatedComments = comments.map((el) => {
          return el.id === Number(this.props.commentId) &&
            el.userId === Number(this.props.userId)
            ? { ...el, title: this.state.title, comment: this.state.comment }
            : el;
        });
        setItems("comments", updatedComments);
        this.setState({
          status: "fullfield",
        });
      }
    }
  };

  handleDelete = ()=>{
    const comments = getItems("comments");

    const newComments = comments.filter((el)=>{return el.id !== this.props.commentId});

    setItems("comments",newComments);
    this.setState({status:"fullfield"})
  }

  render() {
    if (this.state.status === "fullfield") {
      return <Route render={() => <Redirect to={Routes.blog().path} />} />;
    }

    const { classes } = this.props;
    return (
      <div className={classes.commentContainer}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            Title:
            <Input
              placeholder="Title"
              onChange={this.handleTitle}
              inputProps={{ "aria-label": "description" }}
              className={classes.margin + " " + classes.loginInput}
              value={this.state.title}
            />
            Comment:
            <Input
              placeholder="Comment"
              onChange={this.handleComment}
              inputProps={{ "aria-label": "description" }}
              className={classes.margin + " " + classes.loginInput}
              value={this.state.comment}
            />
          </CardContent>
          <CardActions>
            <Button onClick={this.handleUpdateComment}>&#10003;</Button>
            <Button onClick={this.handleDelete}>&times;</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(CardEdit);
