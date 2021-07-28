import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export default function BasicTable({ user }) {
  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("First Name", user.firstName),
    createData("Last Name", user.lastName),
    createData("Email Address", user.email),
    createData("Mobile No.", user.mobile),
    createData("Street Address 1", user.addressLine1),
    createData("Street Address 2", user.addressLine2),
    createData("City", user.city),
    createData("State", user.state),
    createData("ZipCode", user.zipCode),
    createData("Country", user.country),
  ];
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell align="left">Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
