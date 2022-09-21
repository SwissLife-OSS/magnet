import React from "react";
import { Nav, MessageList } from "../../components";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  titlePosition: {
    textAlign: "center",
    marginTop: "35px",
    marginBottom: "0",
  },
  subTitle: {
    textAlign: "center",
    fontWeight: "400",
    marginTop: "10px",
  },
});

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h2 className={classes.titlePosition}>New data is displayed here</h2>
          <h4 className={classes.subTitle}>
            Click on a row to see more Information
          </h4>
          <MessageList />
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default Home;
