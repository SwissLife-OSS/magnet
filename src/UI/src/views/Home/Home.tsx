import { graphql } from "babel-plugin-relay/macro";
import React, { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import { CircularProgress, Grid } from "@mui/material";
import { MessageList } from "../../components";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

export const Home: React.FC = () => {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...MessageList_data
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
          <MessageList queryRef={data} />
        </Suspense>
      </Grid>
      <Grid item xs={0} lg={2}></Grid>
    </Grid>
  );
};
