import React from "react";
import { useParams } from "react-router-dom";
import { Nav } from "../../components";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const useStyles = makeStyles({
  dataSection: {
    marginTop: "20px",
  },
  dataTitle: {
    fontSize: "24px",
    marginTop: "35px",
  },
  tableMargin: {
    marginBottom: "50px",
  },
});

const MessageDetail: React.FC = () => {
  const classes = useStyles();
  let { id } = useParams() ?? "";

  //UUID check
  let pattern =
    /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$/gi;
  const result = id?.match(pattern) ? true : false;

  if (id === undefined || !result) {
    id = "";
    window.location.href = "/message";
  }

  const { message } = useLazyLoadQuery<MessageDetailQuery>(
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
    { id: id },
    { fetchPolicy: "store-or-network" }
  );

  if (message == null) {
    window.location.href = "/message";
  }

  const getDateTime = (date: any) => {
    if (date == null) {
      return "";
    }
    let newDate = new Date(date);

    return newDate.toLocaleString();
  };

  const getBody = (message: any) => {
    if (message.type === "Email") {
      return <span dangerouslySetInnerHTML={{ __html: message?.body }} />;
    } else {
      return message.body;
    }
  };

  return (
    <>
      <Nav />
      <Grid className={classes.dataSection} container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>Title</h1>
          {message?.title}
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} md={4} lg={2}>
          <h1 className={classes.dataTitle}>Type</h1>
          {message?.type}
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <h1 className={classes.dataTitle}>Received at</h1>
          {getDateTime(message?.receivedAt)}
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <h1 className={classes.dataTitle}>Provider</h1>
          {message?.provider}
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <h1 className={classes.dataTitle}>From</h1>
          {message?.from}
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>Body</h1>
          {getBody(message)}
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>To</h1>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Receivers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {message?.to?.map((to) => (
                  <TableRow
                    key={to}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{to}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>Received Log</h1>
          <TableContainer className={classes.tableMargin}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Client name</TableCell>
                  <TableCell>Received at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {message?.receivedLog?.map((element) => (
                  <TableRow
                    key={element?.clientName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.clientName}</TableCell>
                    <TableCell>{getDateTime(element?.receivedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default MessageDetail;
