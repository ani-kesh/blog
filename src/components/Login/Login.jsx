import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setItems, getItems } from "../../helpers/localStorage";
import { Redirect, Link, Route } from "react-router-dom";
import { Routes } from "../../constants/router";

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
      isLogin: false,
      userId: "",
    };
  }

  componentDidMount = ()=>{
    this.setState({
      isLogin: false,
    });
    setItems("isLogged", false);;
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
    if (username !== "" && password !== "") {
      const users = getItems("users");

      if (users != null) {
        const user = users.filter((el) => {
          return el.username === username && el.password === password;
        });
        if (user.length === 0) {
          setItems("users", [
            ...users,
            { id: users.length, username, password, isLogin: true },
          ]);
          this.setState({
            userId: users.length,
          });
        }
        else
        this.setState({
          userId: user[0].id,
        });
      } else {
        setItems("users", [{ id: 0, username, password, isLogin: true }]);
        this.setState({
          userId: 0,
        });
      }

      setItems("isLogged", true);
      this.setState({
        isLogin: true,
      });
    } else {
      this.setState({ isLogin: false });
      setItems("isLogged", false);
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.isLogin)
      return <Redirect to={Routes.blogPage(this.state.userId).path} />;
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
