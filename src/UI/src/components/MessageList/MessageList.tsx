import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";

const useStyles = makeStyles({
  tableMargin: {
    marginTop: "40px",
  },
  rowCursorType: {
    cursor: "pointer",
  },
  titlesPosition: {
    textAlign: "center",
    marginTop: "35px",
  },
  title: {
    marginBottom: "0",
  },
  subTitle: {
    fontWeight: "400",
    marginTop: "10px",
  },
  buttonPosition: {
    textAlign: "center",
    marginTop: "40px",
  },
});

const MessageList: React.FC<{ fragmentRef: any }> = ({ fragmentRef }) => {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment MessageListFragment_query on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "PaginationAmount", defaultValue: 5 }
      )
      @refetchable(queryName: "MessageListRefetchableQuery") {
        messages(after: $cursor, first: $count)
          @connection(key: "ScreenerList_messages") {
          edges {
            node {
              id
              title
              to
              receivedAt
              type
              provider
              body
              from
              primaryReceipient
              properties {
                key
                value
              }
              receivedLog {
                clientName
                isMatch
                receivedAt
              }
            }
          }
        }
      }
    `,
    fragmentRef
  );

  const classes = useStyles();

  const getDateTime = (date: any) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <>
      <div className={classes.titlesPosition}>
        {data?.messages?.edges?.length === 0 && (
          <h2 className={classes.title}>New data is displayed here</h2>
        )}
        {data?.messages?.edges?.length === 0 && (
          <h4 className={classes.subTitle}>
            Click on a row to see more Information
          </h4>
        )}
      </div>
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
            {data?.messages?.edges?.map((element: any) => (
              <TableRow
                key={element?.node?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  window.location.href = `/message/${element?.node?.id}`;
                }}
                className={classes.rowCursorType}
              >
                <TableCell component="th" scope="row">
                  {element?.node?.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {getDateTime(element?.node?.receivedAt)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.provider}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonPosition}>
        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={() => {
            loadNext(1);
          }}
        >
          Load More
        </Button>
        <br></br>
        <br></br>
        <Button
          variant="contained"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Reload
        </Button>
      </div>
    </>
  );
};

export default MessageList;
