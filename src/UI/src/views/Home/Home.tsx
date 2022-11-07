import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { Grid } from "@mui/material";
import { MessageList, Nav } from "../../components";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

const Home: React.FC = () => {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...MessageListFragment_query
      }
    `,
    { fetchPolicy: "store-or-network" }
  );

  return (
    <>
      <Nav />
      <Grid container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <MessageList fragmentRef={data} />
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default Home;
