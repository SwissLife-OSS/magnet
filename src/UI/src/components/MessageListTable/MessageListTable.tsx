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
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly to: ReadonlyArray<string | null> | null;
        readonly receivedAt: string;
        readonly type: string;
        readonly provider: string;
      } | null;
    }> | null;
  } | null;
  hasNext: boolean;
  loadNext(count: number): void;
}

export const MessageListTable: React.FC<MessageListTableProps> = ({
  messages,
  hasNext,
  loadNext,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  const getShortTitle = (title: string) =>
    title.length > 50 ? title.substring(0, 50) + "..." : title;

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
            {messages?.edges?.map((element: any) => (
              <TableRow
                key={element?.node?.id}
                className={(classes.rowStyle, classes.tableRow)}
                onClick={() => {
                  navigate(messagePath(element?.node?.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {getShortTitle(element?.node?.title)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.to[0]}
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
