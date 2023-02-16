import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  imagePosition: {
    textAlign: "center",
  },
  image: {
    width: "50%",
    marginTop: "10%",
  },
  message: {
    fontSize: "30px",
    textAlign: "center",
  },
});

export const NotAuthorizedError: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={0} lg={1}></Grid>
      <Grid className={classes.imagePosition} item xs={12} lg={10}>
        <img
          className={classes.image}
          alt="not authorized"
          src="/images/not_authorized.svg"
        />
      </Grid>
      <Grid item xs={0} lg={1}></Grid>
      <Grid item xs={0} lg={1}></Grid>
      <Grid className={classes.message} item xs={12} lg={10}>
        <br />
        You are not authorized to access this resource.
      </Grid>
      <Grid item xs={0} lg={1}></Grid>
    </Grid>
  );
};
