import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { homePath } from "../../paths";

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
  errorSection: {
    textAlign: "center",
  },
});

export const MessageDetailError: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={0} lg={2}></Grid>
      <Grid className={classes.errorSection} item xs={12} lg={8}>
        <h1 className={classes.errorTitle}>Your Message could not be found</h1>
        <h2 className={classes.errorDescription}>
          Make sure you have a correct ID in your request.
        </h2>
        <Button variant="contained" onClick={() => navigate(homePath)}>
          Go to Home
        </Button>
      </Grid>
      <Grid item xs={0} lg={2}></Grid>
    </Grid>
  );
};
