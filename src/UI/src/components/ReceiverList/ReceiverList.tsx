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
  receivers: ReadonlyArray<string | null> | null;
}

export const ReceiverList: React.FC<ReceiverListProps> = ({ receivers }) => {
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
            {receivers?.map((receiver) => (
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
