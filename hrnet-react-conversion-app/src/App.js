import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CreateEmployeeForm} />
        <Route path="/employee-list" component={EmployeeList} />
      </Switch>
    </Router>
  );
}

export default App;
