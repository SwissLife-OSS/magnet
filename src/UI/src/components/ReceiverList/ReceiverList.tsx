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
import { ReceiverList_messageRecord$key } from "./__generated__/ReceiverList_messageRecord.graphql";

const useStyles = makeStyles({
  dataTitle: {
    fontSize: "20px",
    marginTop: "35px",
    fontWeight: "400",
  },
  tableWidth: {
    minWidth: 650,
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
});

interface ReceiverListProps {
  $ref: ReceiverList_messageRecord$key;
}

export const ReceiverList: React.FC<ReceiverListProps> = ({ $ref }) => {
  const { to } = useFragment(
    graphql`
      fragment ReceiverList_messageRecord on MessageRecord {
        to
      }
    `,
    $ref
  );

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.dataTitle}>To</h1>
      <TableContainer>
        <Table className={classes.tableWidth}>
          <TableHead>
            <TableRow>
              <TableCell>Receivers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {to?.map((receiver) => (
              <TableRow key={receiver} className={classes.tableRow}>
                <TableCell>{receiver}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
