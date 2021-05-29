import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TasksList from "../Components/TasksList";
import SubordinatesList from "../Components/SubordinatesList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  image: {
    height: 150,
    width: 230,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));
function EmployeeDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [text, setText] = React.useState("");

  const [reports, setReports] = React.useState([]);
  const [subordinates, setSubordinates] = React.useState([]);
  const [manager, setManager] = React.useState([]);
  const { id } = useParams();
  const classes = useStyles();
  async function addNewReport() {
    const respose = await axios.post("/employees/addReport/", {
      employee_id: manager.employee_id,
      text: text,
      report_date: new Date(),
    });
    setText("");
  }
  const handleClickOpen = () => {
    setOpen(true);
    // setId(employee_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  React.useEffect(() => {
    console.log("useEffect");
    async function fetchEmployees() {
      const { data } = await axios.get(`/employees/${id}`);
      console.log(data);
      setEmployee(data["employee"]);
      setTasks(data["tasks"]);
      setReports(data["reports"]);
      setSubordinates(data["subordinates"]);
      setManager(data["manager"]);
      if (Object.keys(data["manager"]).length === 0)
        setManager({ first_name: "---", last_name: "---" });
    }
    fetchEmployees();
  }, []);
  return (
    <Paper className={classes.root}>
      <h2>Employee Details</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <img src={employee.image} className={classes.image} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <h4>Name : </h4>
            {employee.first_name + " " + employee.last_name}
          </Paper>
          <Paper className={classes.paper}>
            <h4>Position :</h4> {employee.position}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <h4>Manager : </h4>
            {manager.first_name + " " + manager.last_name}
            <br></br>
            <br></br>
            <Button
              onClick={() => handleClickOpen()}
              variant="contained"
              color="primary"
            >
              Report
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <h4>Report log</h4>
          <List subheader={<li />}>
            {reports.map((report) => (
              <li key={report.report_id} className={classes.listSection}>
                {report.report_date} - {report.text}
              </li>
            ))}
          </List>
        </Grid>
      </Grid>
      <hr></hr>
      <TasksList tasks={tasks}></TasksList>
      <hr></hr>
      <SubordinatesList subordinates={subordinates}></SubordinatesList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Report</DialogTitle>
        <DialogContent>
          <TextField
            value={text}
            autoFocus
            margin="dense"
            id="name"
            label="text"
            type="text"
            onChange={handleChangeText}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              addNewReport();
              setOpen(false);
            }}
            color="primary"
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default EmployeeDetails;
