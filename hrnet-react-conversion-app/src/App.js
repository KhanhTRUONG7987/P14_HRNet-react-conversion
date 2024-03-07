import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import EmployeeList from './components/EmployeeList';
import './styles/app.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployeeForm />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
