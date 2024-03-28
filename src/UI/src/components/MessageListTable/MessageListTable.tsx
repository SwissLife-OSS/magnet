import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { messagePath } from "../../paths";
import { graphql, useFragment } from "react-relay";
import { MessageListTable_messagesEdge$key } from "./__generated__/MessageListTable_messagesEdge.graphql";
import { MessageListTable_messageRecord$key } from "./__generated__/MessageListTable_messageRecord.graphql";

const useStyles = makeStyles({
  rowStyle: {
    cursor: "pointer",
    textDecoration: "none",
  },
  loadMoreButtonPosition: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "40px",
  },
  tableContainer: {
    maxHeight: (window.innerHeight / 3) * 2.5,
  },
  tableWidth: {
    minWidth: 650,
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
});

interface MessageListTableProps {
  $ref?: MessageListTable_messagesEdge$key | null;
  hasNext: boolean;
  loadNext(count: number): void;
}

export const MessageListTable: React.FC<MessageListTableProps> = ({
  $ref,
  hasNext,
  loadNext,
}) => {
  const edges = useFragment(
    graphql`
      fragment MessageListTable_messagesEdge on MessagesEdge
      @relay(plural: true) {
        node {
          ...MessageListTable_messageRecord
        }
      }
    `,
    $ref
  );

  const messages = edges?.map((edge) => edge);
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader className={classes.tableWidth}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>To</TableCell>
              <TableCell>When</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages?.map((element: any) => (
              <Row key={element?.node?.id} $ref={element} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.loadMoreButtonPosition}>
        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={() => {
            loadNext(30);
          }}
        >
          Load More
        </Button>
      </div>
    </>
  );
};

interface RowProps {
  $ref: MessageListTable_messageRecord$key;
}

function Row({ $ref }: RowProps) {
  const node = useFragment(
    graphql`
      fragment MessageListTable_messageRecord on MessageRecord {
        id
        title
        receivedAt
        type
        provider
        to
      }
    `,
    $ref
  );
  const classes = useStyles();
  const navigate = useNavigate();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  const getShortTitle = (title: string) =>
    title.length > 50 ? title.substring(0, 50) + "..." : title;

  return (
    <TableRow
      key={node.id}
      className={(classes.rowStyle, classes.tableRow)}
      onClick={() => navigate(messagePath(node.id))}
    >
      <TableCell component="th" scope="row">
        {getShortTitle(node.title)}
      </TableCell>
      <TableCell component="th" scope="row">
        {node.to?.[0]}
      </TableCell>
      <TableCell component="th" scope="row">
        {getDateTime(node.receivedAt)}
      </TableCell>
      <TableCell component="th" scope="row">
        {node.type}
      </TableCell>
      <TableCell component="th" scope="row">
        {node.provider}
      </TableCell>
    </TableRow>
  );
}
