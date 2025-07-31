import React, { Suspense } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { CircularProgress, Grid } from "@mui/material";
import { MessageList } from "../../components";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

interface HomeProps {
  search?: string;
}

export const Home: React.FC<HomeProps> = ({ search }) => {
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
      <Grid item xs={1} lg={1}></Grid>
      <Grid item xs={10} lg={10}>
        <Suspense fallback={<CircularProgress />}>
          <MessageList fragmentRef={data} search={search} />
        </Suspense>
      </Grid>
      <Grid item xs={1} lg={1}></Grid>
    </Grid>
  );
};
