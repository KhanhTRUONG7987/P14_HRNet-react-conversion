import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import 'react-datepicker/react-datepicker.css';
import 'react-dropdown/style.css';

const CreateEmployeeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label htmlFor="start-date">Start Date</label>
            <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
            />

            <label htmlFor="department">Department</label>
            <Dropdown
                id="department"
                options={['HR', 'Finance', 'Marketing']}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                placeholder="Select an option"
            />

            <button type="submit">Save</button>
        </form>
    );
}

export default CreateEmployeeForm;
