import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles/createEmployeeForm.css';

const CreateEmployeeForm = ({ setEmployees }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            startDate: startDate.toISOString(), // convert to ISO string format
            department: selectedDepartment,
            dateOfBirth: dateOfBirth,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode
        };
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    };

    return (
        <div className="container">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="start-date">Start Date</label>
                    <div className="date-picker-container">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="department">Department</label>
                    <Dropdown
                        className='department'
                        options={['HR', 'Finance', 'Marketing']}
                        value={selectedDepartment}
                        onChange={(option) => setSelectedDepartment(option.value)} // Update selectedDepartment with option value
                        placeholder="Select an option"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input type="text" id="date-of-birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                </div>

                <div className="form-field">
                    <label htmlFor="zip-code">Zip Code</label>
                    <input type="text" id="zip-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>

                <div className="button-container">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default CreateEmployeeForm;
