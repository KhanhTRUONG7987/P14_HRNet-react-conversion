import React, { useEffect, useState } from 'react';
import ModalTrigger from 'react-modal-kt/dist/lib/ModalTrigger/ModalTrigger.js';
import { useModal } from 'react-modal-kt/dist/lib/ModalContext/ModalContext.js';
import 'react-modal-kt/dist/lib/ModalManager/ModalManager.css';
import 'react-modal-kt/dist/lib/Modal/Modal.css';
import 'react-modal-kt/dist/lib/Overlay/Overlay.css';
import 'react-modal-kt/dist/lib/ModalTrigger/ModalTrigger.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { closeModal } = useModal();

    const closeModalOnEscape = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', closeModalOnEscape);

        return () => {
            document.removeEventListener('keyup', closeModalOnEscape);
        };
    }, []);

    useEffect(() => {
        // fetch employees from local storage
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // handle saving the employee
    const saveEmployee = (e) => {
        e.preventDefault();
        const form = e.target;
        const newEmployee = {
            id: Date.now(), // generate unique id for the employee
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            startDate: startDate.toISOString(),
            department: form.department.value,
            dateOfBirth: form.dateOfBirth.value,
            street: form.street.value,
            city: form.city.value,
            state: form.state.value,
            zipCode: form.zipCode.value
        };

        // update employees state with new employee
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);

        // update local storage with updated employees list
        localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));

        // close modal after saving
        closeModal();
    };

    return (
        <div className="container">
            <h2>Current Employees</h2>
            {/* table displaying current employees */}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Start Date</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.startDate}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.street}</td>
                            <td>{employee.city}</td>
                            <td>{employee.state}</td>
                            <td>{employee.zipCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* modal for creating a new employee */}
            <ModalTrigger
                closeText="Cancel"
                closeClass="custom-close-class"
                closeExisting={true}
                escapeClose={true}
                clickClose={true}
                modalClass="custom-modal"
                fadeDuration={300}
                fadeDelay={0.5}
                content={
                    <form onSubmit={saveEmployee}>
                        <h2>Create Employee</h2>
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" name="firstName" required />
                        
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" name="lastName" required />

                        <label htmlFor="start-date">Start Date</label>
                        <div className="date-picker-container">
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        <label htmlFor="department">Department</label>
                        <input type="text" id="department" name="department" required />

                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input type="text" id="date-of-birth" name="dateOfBirth" required />

                        <label htmlFor="street">Street</label>
                        <input type="text" id="street" name="street" required />

                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" required />

                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" required />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input type="text" id="zip-code" name="zipCode" required />

                        <button type="submit">Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </form>
                }
            />
            <a href="/">Home</a>
        </div>
    );
};

export default EmployeeList;
