import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setItems,getItems } from "../../helpers/localStorage";
import {Routes} from "../../constants/router"
import {Link } from "react-router-dom";

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
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsername = (ev) => {
    this.setState({
      username: ev.target.value,
    });
  };

  handlePassword = (ev) => {
    this.setState({
      password: ev.target.value,
    });
  };

  handleLogin = () => {
      const username = this.state.username.trim(); 
      const password = this.state.password.trim(); 
        if(username !== "" && password !== ""){
            const users = getItems("users");
            if(users != null){
                const user = users.filter((el)=>{
                    return el.username === username && el.password === password
                });
                // if(user.length > 0){
                //     console.log(Routes.blog.path);
                //     <Link to={Routes.blog.path}/>
                // }
                // else{
                //     setItems("users",[{username,password}])
                // }
            }
        }
  };

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
            onChange={this.handleUsername}
          />
          <CssTextField
            className={classes.margin + " " + classes.loginInput}
            label="Password"
            variant="outlined"
            id="custom-css-outlined-input"
            type="password"
            onChange={this.handlePassword}
          />
          <Button variant="outlined" onClick={this.handleLogin}>
            Default
          </Button>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(Login);