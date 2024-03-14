// hrnet-react-conversion-app/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CreateEmployeeForm
              pageTitle="HRnet - Create Employee"
              metaDescription="Create new employee form for HRnet"
            />
          }
        />
        <Route
          path="/employee-list"
          element={
            <EmployeeList
              pageTitle="HRnet - Employee List"
              metaDescription="List of employees in HRnet"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
