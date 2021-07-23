import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const useStyles = (theme) => ({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "400px",
    margin: "10px auto",
    padding: "20px",
  },
  loginInput: {
    width: "400px",
    margin: "10px",
  },
});

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin = ()=>{
      
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.loginContainer}>
          <CssTextField
            className={classes.margin + " " + classes.loginInput}
            label="Login"
            variant="outlined"
            id="custom-css-outlined-input"
          />
          <CssTextField
            className={classes.margin + " " + classes.loginInput}
            label="Password"
            variant="outlined"
            id="custom-css-outlined-input"
          />
          <Button variant="outlined" onClick={this.handleLogin}>Default</Button>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(Login);
