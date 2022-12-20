import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  MessageDetailError,
  QuickInformation,
  ReceivedLogTable,
  ReceiverList,
} from "../../components";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";

const useStyles = makeStyles({
  dataSection: {
    marginTop: "20px",
  },
});

export const MessageDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();

  const data = useLazyLoadQuery<MessageDetailQuery>(
    graphql`
      query MessageDetailQuery($id: Uuid!) {
        message(id: $id) {
          id
          title
          type
          receivedAt
          provider
          from
          to
          body
          receivedLog {
            clientName
            receivedAt
          }
        }
      }
    `,
    { id: id ?? "" },
    { fetchPolicy: "store-or-network" }
  );

  return (
    <>
      {data.message ? (
        <Grid className={classes.dataSection} container>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={12} lg={8}>
            <QuickInformation message={data?.message} />
          </Grid>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={12} lg={8}>
            <ReceiverList receivers={data?.message?.to} />
          </Grid>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={12} lg={8}>
            <ReceivedLogTable receivedLog={data?.message?.receivedLog} />
          </Grid>
          <Grid item xs={0} lg={2}></Grid>
        </Grid>
      ) : (
        <MessageDetailError />
      )}
    </>
  );
};
