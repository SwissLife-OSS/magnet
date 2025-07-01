import React, { Suspense } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { Grid, Box } from "@mui/material";
import { MessageList } from "../../components";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  </Box>
);


export interface HomeProps {
  search: string;
};


export const Home: React.FC<HomeProps> = ({search}) => {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...MessageList_query
      }
    `,
    {},
  );

  return (
    <Grid container>
      <Grid item xs={0} lg={2}></Grid>
      <Grid item xs={12} lg={8}>
        <Suspense fallback={<LoadingSpinner />}>
          <MessageList fragmentRef={data} search={search} />
        </Suspense>
      </Grid>
      <Grid item xs={0} lg={2}></Grid>
    </Grid>
  );
};
