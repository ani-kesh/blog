import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setItems, getItems } from "../../helpers/localStorage";
import { Redirect } from "react-router-dom";
import { Routes } from "../../constants/router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

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
  errorMessage: {
    color: "red",
  },
  button: {
    backgroundColor: "#546e7a",
    color: "white",
    padding: "10px 25px",
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
      isValidLogin: true,
    };
  }

  componentDidMount = () => {
    this.setState({
      isLogin: false,
    });
    setItems("isLogged", false);
    setItems("userId", null);
  };
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
          setItems("userId", users.length);
          this.setState({
            userId: users.length,
          });
        } else {
          this.setState({
            userId: user[0].id,
          });
          setItems("userId", user[0].id);
        }
      } else {
        setItems("users", [{ id: 0, username, password, isLogin: true }]);
        setItems("userId", 0);
        this.setState({
          userId: 0,
        });
      }

      setItems("isLogged", true);
      this.setState({
        isLogin: true,
        isValidLogin: true,
      });
    } else {
      this.setState({ isLogin: false, isValidLogin: false });
      setItems("isLogged", false);
      setItems("userId", null);
    }
  };

  render() {
    const { classes } = this.props;

    if (this.state.isLogin) {
      this.props.handleLogin(this.state.isLogin);
      return <Redirect to={Routes.blog().path} />;
    }

    return (
      <div className={classes.loginContainer}>
        {this.state.isValidLogin ? (
          <></>
        ) : (
          <Typography component="div">
            <Box textAlign="center" m={1} className={classes.errorMessage}>
              Please fill username and password.
            </Box>
          </Typography>
        )}
        <TextField
          className={classes.margin + " " + classes.loginInput}
          label="Login"
          type="text"
          variant="outlined"
          onChange={this.handleUsername}
        />
        <TextField
          className={classes.margin + " " + classes.loginInput}
          label="Password"
          type="password"
          variant="outlined"
          onChange={this.handlePassword}
        />
        <Button
          variant="contained"
          onClick={() => {
            this.handleLogin();
          }}
          className={classes.button}
        >
          Log In
        </Button>
      </div>
    );
  }
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(Login);
