import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import { Routes } from "../../constants/router";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { getItems } from "../../helpers/localStorage";
import Login from "../Login/Login";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  login: {
    position: "absolute",
    right: theme.spacing(1),
  },
});

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isLogged: Boolean(getItems("isLogged")),
    };
  }

  handleChange = (event, newValue) => {
    console.log(event.target)
    this.setState({
      value: event.target.value,
    });
  };

  handleLogin = (value = Boolean(getItems("isLogged"))) => {
    this.setState({
      isLogged: value,
    });
  };

  handleLogout = () => {
    const isLogged = Boolean(getItems("isLogged"));
    if (isLogged)
      this.setState({
        isLogged: !isLogged,
      });
  };

  render() {
    const { classes } = this.props;
    const logName = this.state.isLogged ? "Log Out" : "Log In";
    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="simple tabs example"
            >
              {Object.values(Routes).map((fn,ind) => {
                const { path, text } = fn();
                return path !== "*" && !path.includes("/blog/") ? (
                  path === "/login" ? (
                    <Tab
                      label={logName}
                      component={Link}
                      to={path}
                      key={Math.random()}
                      index={ind}
                      className={classes.login}
                      onClick={this.handleLogout}
                      value={ind}
                    />
                  ) : (
                    <Tab
                      label={text}
                      component={Link}
                      to={path}
                      key={Math.random()}
                      index={ind}
                      value={ind}
                    />
                  )
                ) : (
                  <label key={Math.random()} index={ind}  value={ind}/>
                );
              })}
            </Tabs>
          </AppBar>
          <TabPanel>
            <Switch>
              {Object.values(Routes).map((fn,ind) => {
                const { path, component } = fn();

                return path.includes("login") ? (
                  <Route
                    key={Math.random()}
                    path={path}  
                    render={() => <Login handleLogin={this.handleLogin} />}
                  />
                ) : (
                  <Route
                    exact
                    path={path}
                    component={component}
                    key={Math.random()}
                  />
                );
              })}
            </Switch>
          </TabPanel>
        </div>
      </Router>
    );
  }
}

export default withStyles(useStyles)(Nav);
