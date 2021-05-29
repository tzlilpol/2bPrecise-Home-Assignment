import Employees from "./Pages/Employees";
import { Route, Switch } from "react-router-dom";
import EmployeeDetails from "./Pages/EmployeeDetails";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Employees></Employees>
        </Route>
        <Route path="/employee/:id">
          <EmployeeDetails></EmployeeDetails>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
