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
});

interface Receivers {
  receivers: ReadonlyArray<string | null> | null;
}

const ReceiverList: React.FC<Receivers> = ({ receivers }) => {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.dataTitle}>To</h1>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Receivers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivers?.map((receiver) => (
              <TableRow
                key={receiver}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{receiver}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReceiverList;
