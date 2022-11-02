import React from "react";
import { Nav } from "../../components";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";

const useStyles = makeStyles({
  errorTitle: {
    fontSize: "30px",
    marginBottom: "0px",
    marginTop: "25%",
  },
  errorDescription: {
    fontSize: "15px",
    fontWeight: 500,
  },
  returnLink: {
    textDecoration: "none",
  },
  returnButton: {
    marginTop: "5px !important",
  },
  errorSection: {
    textAlign: "center",
  },
});

const MessageDetailError: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid className={classes.errorSection} item xs={12} lg={8}>
          <h1 className={classes.errorTitle}>
            Your Message could not be found
          </h1>
          <h2 className={classes.errorDescription}>
            Make sure you have a correct ID in your request.
          </h2>
          <Link className={classes.returnLink} to={"/"}>
            <Button className={classes.returnButton} variant="contained">
              Go to Home
            </Button>
          </Link>
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default MessageDetailError;
