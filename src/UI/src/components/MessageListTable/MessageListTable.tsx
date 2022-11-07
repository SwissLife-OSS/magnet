import React from "react";
import { useNavigate } from "react-router-dom";
import {
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
  tableMargin: {
    marginTop: "40px",
  },
  rowStyle: {
    cursor: "pointer",
    textDecoration: "none",
  },
});

const MessageListTable: React.FC<{ data: any }> = ({ data }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  const getShortTitle = (title: string) =>
    title.length > 50 ? title.substring(0, 50) + "..." : title;

  return (
    <>
      <TableContainer className={classes.tableMargin}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {data?.messages?.edges?.map((element: any) => (
              <TableRow
                key={element?.node?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={classes.rowStyle}
                onClick={() => {
                  navigate(messagePath(element?.node?.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {getShortTitle(element?.node?.title)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.primaryReceipient}
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
    </>
  );
};

export default MessageListTable;
