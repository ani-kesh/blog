import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { getItems, setItems } from "../../helpers/localStorage";
import CardActions from "@material-ui/core/CardActions";
import { Link, Redirect, Route } from "react-router-dom";
import { Routes } from "../../constants/router";
import Button from "@material-ui/core/Button";
import CardEdit from "../CardEdit/CardEdit";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const useStyles = (theme) => ({
  commentContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100vw",
  },
  root: {
    marginLeft: "100px",
    marginTop: "10px",
    maxWidth: 800,
    width: 800,
  },
  media: {
    height: 0,
    paddingTop: "16.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    fontSize: "25px",
  },
});

export class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: Boolean(getItems("isLogged")),
      userId: "",
      userName: "",
      isEdit: false,
      isDeleted: false,
    };
  }

  componentDidMount() {
    const userId = getItems("userId");
    const users = getItems("users");
    if (userId !== "null") {
      this.setState({
        userId: userId,
      });
      const user = users.filter((el) => {
        return el.id === this.props.userId;
      });

      if (this.props.type !== "edit")
        this.setState({ userName: user[0].username });
    }
  }

  handleEdit = () => {
    this.setState({ isEdit: true });
  };

  handleDelete = () => {
    const comments = getItems("comments");

    const newComments = comments.filter((el) => {
      return el.id !== this.props.id;
    });

    setItems("comments", newComments);
    this.setState({ isDeleted: true });
  };

  render() {
    if (this.state.isDeleted)
      return <Route render={() => <Redirect to={Routes.blog().path} />} />;
    const { classes, date, title, comment, id, type, userId } = this.props;
    const [avatarName] = this.state.userName;
    if (!this.state.isEdit) {
      return (
        <Box className={classes.commentContainer}>
          <Card className={classes.root}>
            {type === "edit" && this.state.userId === userId ? (
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {avatarName}
                  </Avatar>
                }
                action={
                  <div>
                    <Button
                      onClick={this.handleEdit}
                      className={classes.button}
                    >
                      &#9998;
                    </Button>
                    <Button
                      onClick={this.handleDelete}
                      className={classes.button}
                    >
                      &times;
                    </Button>
                  </div>
                }
                title={title}
                subheader={date}
              />
            ) : (
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {avatarName}
                  </Avatar>
                }
                title={title}
                subheader={date}
              />
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {comment}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box className={classes.footer}>
                {type === "edit" ? (
                  ""
                ) : (
                  <Link to={Routes.blog_page(id).path}>Learn more</Link>
                )}
              </Box>
            </CardActions>
          </Card>
        </Box>
      );
    }

    return (
      <CardEdit
        title={title}
        comment={comment}
        userId={this.state.userId}
        commentId={id}
      />
    );
  }
}

CommentCard.protoTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(useStyles)(CommentCard);
