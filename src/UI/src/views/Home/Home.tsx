import React from "react";
import { Nav, MessageList } from "../../components";
import { Grid } from "@mui/material";
import { useLazyLoadQuery } from "react-relay";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";
import { graphql } from "babel-plugin-relay/macro";

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
