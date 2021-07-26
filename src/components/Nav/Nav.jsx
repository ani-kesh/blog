import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Routes } from "../../constants/router";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { getItems } from "../../helpers/localStorage";

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


export class Nav extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      value:0,
      isLogged:Boolean(getItems("isLogged"))
    }
  }

  handleChange = (event, newValue) => {
    this.setState({value:event.target.value, isLogged:Boolean(getItems("isLogged"))})
  };

  render(){
    console.log(this.state.isLogged)
    const { classes} = this.props;
      return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            {Object.values(Routes).map((fn) => {
              const { path, text } = fn();
              return path !== "*" && !path.includes("/blog/") ? (
                path === "/login" ? (
                  <Tab
                    label={text}
                    component={Link}
                    to={path}
                    key={Math.random()}
                    index={Math.random()}
                    className={classes.login}
                  />
                ) : (
                  <Tab
                    label={text}
                    component={Link}
                    to={path}
                    key={Math.random()}
                    index={Math.random()}
                  />
                )
              ) : (
                <label key={Math.random()} index={Math.random()} />
              );
            })}
          </Tabs>
        </AppBar>
        <TabPanel>
          <Switch>
            {Object.values(Routes).map((fn) => {
              const { path, component } = fn();

              return (
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
  )
  }
}


export default withStyles(useStyles)(Nav);
