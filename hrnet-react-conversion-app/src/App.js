import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./styles/app.css";
import { ModalProvider } from "react-modal-dk2/dist/lib/ModalContext/ModalContext";

function App() {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CreateEmployeeForm />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
