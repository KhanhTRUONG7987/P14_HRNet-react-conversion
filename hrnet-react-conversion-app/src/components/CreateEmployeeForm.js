import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const CreateEmployeeForm = ({ setEmployees }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDepartment, setSelectedDepartment] = useState(null);
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
            startDate: startDate,
            department: selectedDepartment.value,
            dateOfBirth: dateOfBirth,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode
        };
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label htmlFor="start-date">Start Date</label>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <label htmlFor="department">Department</label>
            <Dropdown
                className='department'
                options={['HR', 'Finance', 'Marketing']}
                value={selectedDepartment}
                onChange={(option) => setSelectedDepartment(option)}
                placeholder="Select an option"
            />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <input type="text" id="date-of-birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

            <label htmlFor="street">Street</label>
            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />

            <label htmlFor="city">City</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />

            <label htmlFor="state">State</label>
            <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />

            <label htmlFor="zip-code">Zip Code</label>
            <input type="text" id="zip-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />

            <button type="submit">Save</button>
        </form>
    );
}

export default CreateEmployeeForm;
