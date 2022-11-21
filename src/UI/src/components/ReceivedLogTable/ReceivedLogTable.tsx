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
  tableMargin: {
    marginBottom: "50px",
  },
});

interface ReceivedLog {
  receivedLog: ReadonlyArray<{
    clientName: string | null;
    receivedAt: string;
  } | null> | null;
}

const ReceivedLogTable: React.FC<ReceivedLog> = ({ receivedLog }) => {
  const classes = useStyles();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  return (
    <>
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
            {receivedLog?.map((element) => (
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
    </>
  );
};

export default ReceivedLogTable;
