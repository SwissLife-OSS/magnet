import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ReceivedLogTable_messageRecord$key } from "./__generated__/ReceivedLogTable_messageRecord.graphql";

const useStyles = makeStyles({
  dataTitle: {
    fontSize: "20px",
    marginTop: "35px",
    fontWeight: "400",
  },
  tableMargin: {
    marginBottom: "50px",
  },
  tableWidth: {
    minWidth: 650,
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
});

interface ReceivedLogTableProps {
  $ref: ReceivedLogTable_messageRecord$key;
}

export const ReceivedLogTable: React.FC<ReceivedLogTableProps> = ({ $ref }) => {
  const { receivedLog } = useFragment(
    graphql`
      fragment ReceivedLogTable_messageRecord on MessageRecord {
        receivedLog {
          clientName
          receivedAt
        }
      }
    `,
    $ref
  );

  const classes = useStyles();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  return (
    <>
      <h1 className={classes.dataTitle}>Received Log</h1>
      <TableContainer className={classes.tableMargin}>
        <Table className={classes.tableWidth}>
          <TableHead>
            <TableRow>
              <TableCell>Client name</TableCell>
              <TableCell>Received at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivedLog?.map((element) => (
              <TableRow className={classes.tableRow} key={element?.clientName}>
                <TableCell>{element?.clientName}</TableCell>
                <TableCell>{getDateTime(element?.receivedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
