import React from "react";
import Nav from "../../components/Nav/Nav";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  imagePosition: {
    textAlign: "center",
  },
  image: {
    width: "100%",
  },
  message: {
    fontSize: "40px",
    textAlign: "center",
  },
  returnLink: {
    textDecoration: "none",
  },
  returnButton: {
    marginTop: "30px !important",
  },
});

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid container>
        <Grid item xs={0} lg={4}></Grid>
        <Grid className={classes.imagePosition} item xs={12} lg={4}>
          <img
            className={classes.image}
            alt="not found"
            src="/images/not_found.webp"
          />
        </Grid>
        <Grid item xs={0} lg={4}></Grid>
        <Grid item xs={0} lg={4}></Grid>
        <Grid className={classes.message} item xs={12} lg={4}>
          Page not Found
          <br></br>
          <Link className={classes.returnLink} to={"/"}>
            <Button className={classes.returnButton} variant="contained">
              Go to Home
            </Button>
          </Link>
        </Grid>
        <Grid item xs={0} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default NotFound;
