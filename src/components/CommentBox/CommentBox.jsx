import React from "react";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

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

export class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
  }

  render() {
    const { classes, handleTitle, handleComment, handleAddComment, isTitle } =
      this.props;
    return (
      <Box className={classes.loginContainer}>
        {isTitle ? (
          <Input
            placeholder="Title"
            onChange={handleTitle}
            inputProps={{ "aria-label": "description" }}
            className={classes.margin + " " + classes.loginInput}
          />
        ) : (
          <></>
        )}
        <TextField
          id="standard-multiline-static"
          label=""
          multiline
          rows={4}
          onChange={handleComment}
          placeholder="Comment"
          className={classes.margin + " " + classes.loginInput}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          className={classes.button}
        >
          Add
        </Button>
      </Box>
    );
  }
}

export default withStyles(useStyles)(CommentBox);
