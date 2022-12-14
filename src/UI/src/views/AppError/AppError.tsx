import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  imagePosition: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginTop: "20%",
  },
  messagePosition: {
    fontSize: "30px",
    textAlign: "center",
  },
  message: {
    marginTop: "5%",
  },
});

export const AppError: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={0} lg={4}></Grid>
      <Grid className={classes.imagePosition} item xs={12} lg={4}>
        <img
          className={classes.image}
          alt="app error"
          src="/images/app_error.png"
        />
      </Grid>
      <Grid item xs={0} lg={4}></Grid>
      <Grid item xs={0} lg={4}></Grid>
      <Grid className={classes.messagePosition} item xs={12} lg={4}>
        <div className={classes.message}>Oops, something went wrong!</div>
      </Grid>
      <Grid item xs={0} lg={4}></Grid>
    </Grid>
  );
};
