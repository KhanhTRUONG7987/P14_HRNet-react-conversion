import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import EmployeeList from './components/EmployeeList';
import './styles/app.css';
import { ModalProvider } from 'react-modal-dk2/dist/lib/ModalContext/ModalContext';

function App() {
  const saveEmployee = (newEmployee) => {
    console.log('Saving new employee:', newEmployee);
  };

  return (
    <ModalProvider> 
      <Router>
        <Routes>
          <Route
            path="/"
            element={<CreateEmployeeForm saveEmployee={saveEmployee} />}
          />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
