import React from "react";
import { getItems } from "../../helpers/localStorage";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

  render() {
    const { classes } = this.props;
    return (
        <>
        <div className={classes.loginContainer}>
            <Input placeholder="Title" inputProps={{ 'aria-label': 'description' }} className={classes.margin + " " + classes.loginInput}/>
            <TextField
          id="standard-multiline-static"
          label=""
          multiline
          rows={4}
          placeholder="Comment"
          className={classes.margin + " " + classes.loginInput}
        />
          <Button variant="outlined" onClick={this.handleLogin}>
            Add
          </Button>
        </div>
      </>
    )
  }
}

export default withStyles(useStyles)(AddComment);