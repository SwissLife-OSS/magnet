import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { homePath } from "../../paths";

const useStyles = makeStyles({
  imagePosition: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginTop: "10%",
  },
  message: {
    fontSize: "30px",
    textAlign: "center",
  },
  returnLink: {
    textDecoration: "none",
  },
  returnButton: {
    marginTop: "15px !important",
  },
});

export const NotFound: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={0} lg={4}></Grid>
      <Grid className={classes.imagePosition} item xs={12} lg={4}>
        <img
          className={classes.image}
          alt="not found"
          src="/images/not_found.jpg"
        />
      </Grid>
      <Grid item xs={0} lg={4}></Grid>
      <Grid item xs={0} lg={4}></Grid>
      <Grid className={classes.message} item xs={12} lg={4}>
        The page you are looking for isn't here
        <br />
        <Button
          className={classes.returnButton}
          variant="contained"
          onClick={() => navigate(homePath)}
        >
          Go to Home
        </Button>
      </Grid>
      <Grid item xs={0} lg={4}></Grid>
    </Grid>
  );
};
