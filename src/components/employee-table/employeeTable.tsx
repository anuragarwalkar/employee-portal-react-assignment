import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Action from "./action/action";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styles from './employeeTable.module.scss';

const actionItems = [
  { name: "Edit", id: 1 },
  { name: "Delete", id: 2 },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  name: string,
  empCode: number,
  projectAssigned: string,
  techStack: string
) {
  return { name, empCode, projectAssigned, techStack };
}

const rows = [
  createData("Anurag Arwalkar", 159, "GCP", "sveltejs"),
  createData("Sayali Bujade", 237, "Git Scm", "Vue"),
];

const EmployeeTable = ({addNew}: {addNew: () => void}) => {
  const classes = useStyles();

  return (
    <div className={styles.employeeTable}>
      <div className={styles.employeeTableHeader}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />} 
        onClick={addNew} >
        Add New
      </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Emp Code</TableCell>
              <TableCell align="right">Project assigned</TableCell>
              <TableCell align="right">Technology Stack</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.empCode}</TableCell>
                <TableCell align="right">{row.projectAssigned}</TableCell>
                <TableCell align="right">{row.techStack}</TableCell>
                <TableCell align="right">
                  <Action items={actionItems} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeeTable;
