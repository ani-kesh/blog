import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 700,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
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
  errorContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#546e7a",
    padding: "30px 0",
  },
  icon: {
    width: "400px",
    height: "400px",
    transform: "rotateX(3.142rad)",
    color: "white",
  },
  errorTitle: {
    width: "100%",
    fontSize: "8em",
    textAlign: "center",
    fontFamily: "Arial Black",
    letterSpacing: -"1px",
    color: "white",
  },
});

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.errorContainer}>
      <div className={classes.errorTitle}>Error</div>
      <SentimentVeryDissatisfiedIcon className={classes.icon} />
    </div>
  );
}

NotFound.protoTypes = {
  classes: PropTypes.object.isRequired,
};
