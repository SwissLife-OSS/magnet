import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableMargin: {
    marginTop: "40px",
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 12, 4.0),
  createData("Ice cream", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 5.5),
];

const MessageList: React.FC = () => {
  const classes = useStyles();

  return (
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                window.location.href = `/message/${row.name}`;
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.calories}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.fat}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.carbs}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessageList;
