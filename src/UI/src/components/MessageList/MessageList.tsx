import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { MessageListQuery } from "./__generated__/MessageListQuery.graphql";


const useStyles = makeStyles({
  tableMargin: {
    marginTop: "40px",
  },
});

const MessageList: React.FC = () => {
  const classes = useStyles();

  const { messages } = useLazyLoadQuery<MessageListQuery>(
    graphql`
      query MessageListQuery {
        messages {
          id
          title
          receivedAt
          type
          provider
        }
      }
    `,
    { fetchPolicy: "store-or-network" }
  );

  const getDateTime = (date: any) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <TableContainer className={classes.tableMargin}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>When</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Provider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages?.map((message) => (
            <TableRow
              key={message?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                window.location.href = `/message/${message?.id}`;
              }}
            >
              <TableCell component="th" scope="row">
                {message?.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {getDateTime(message?.receivedAt)}
              </TableCell>
              <TableCell component="th" scope="row">
                {message?.type}
              </TableCell>
              <TableCell component="th" scope="row">
                {message?.provider}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessageList;
