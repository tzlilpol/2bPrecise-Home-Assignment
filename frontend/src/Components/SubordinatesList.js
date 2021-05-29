import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const columns = [
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  { id: "position", label: "Position", minWidth: 170 },
];
function SubordinatesList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [dueDate, dueDateSet] = React.useState("2017-05-24T10:30");
  const [id, setId] = React.useState("");

  async function addNewTask() {
    const respose = await axios.post("/employees/addTask/", {
      employee_id: id,
      text: text,
      assign_date: new Date(),
      due_date: dueDate,
    });
    setText("");
  }
  const handleClickOpen = (employee_id) => {
    setOpen(true);
    setId(employee_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeDate = (event) => {
    console.log(event.target.value);

    dueDateSet(event.target.value);
  };
  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer className={classes.container}>
      <h2>My Subordinates</h2>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.subordinates
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.employee_id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(row.employee_id)}
                    >
                      {"Assign Task"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
        <DialogContent>
          <TextField
            id="datetime-local"
            label="due date"
            type="datetime-local"
            value={dueDate}
            fullWidth
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeDate}
          />
          <TextField
            autoFocus
            value={text}
            margin="dense"
            id="name"
            label="text"
            type="text"
            fullWidth
            onChange={handleChangeText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              addNewTask();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default SubordinatesList;
