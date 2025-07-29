import React, { Suspense } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { CircularProgress, Grid } from "@mui/material";
import { MessageList } from "../../components";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

export const Home: React.FC = () => {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...MessageList_query
      }
    `,
    {},
    { fetchPolicy: "store-or-network" }
  );

  return (
    <Grid container>
      <Grid item xs={0} lg={2}></Grid>
      <Grid item xs={12} lg={8}>
        <Suspense fallback={<CircularProgress />}>
          <MessageList fragmentRef={data} />
        </Suspense>
      </Grid>
      <Grid item xs={0} lg={2}></Grid>
    </Grid>
  );
};
