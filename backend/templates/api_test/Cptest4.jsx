import React, { useState } from 'react';
import axios from 'axios';

function Cptest4() {
    const [formData, setFormData] = useState({
        subject_name: '',
        subject_code: '',
        faculty_name: '',
        student_name: '',
        faculty_designation: '',
        roll_number: '',
        semester: '',
        group: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://panel.mait.ac.in:8005/stationery/generate-firstpage/', formData, {
                responseType: 'blob' // Response type as blob for downloading file
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'stationery.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error:', error);
            // Handle error if necessary
        }
    };

    return (
        <div>
            <h1>Stationery Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject_name">Subject Name:</label>
                <input type="text" name="subject_name" value={formData.subject_name} onChange={handleChange} required /><br />

                <label htmlFor="subject_code">Subject Code:</label>
                <input type="text" name="subject_code" value={formData.subject_code} onChange={handleChange} required /><br />

                <label htmlFor="faculty_name">Faculty Name:</label>
                <input type="text" name="faculty_name" value={formData.faculty_name} onChange={handleChange} required /><br />

                <label htmlFor="student_name">Student Name:</label>
                <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required /><br />

                <label htmlFor="faculty_designation">Faculty Designation:</label>
                <input type="text" name="faculty_designation" value={formData.faculty_designation} onChange={handleChange} required /><br />

                <label htmlFor="roll_number">Roll Number:</label>
                <input type="text" name="roll_number" value={formData.roll_number} onChange={handleChange} required /><br />

                <label htmlFor="semester">Semester:</label>
                <input type="text" name="semester" value={formData.semester} onChange={handleChange} required /><br />

                <label htmlFor="group">Group:</label>
                <input type="text" name="group" value={formData.group} onChange={handleChange} required /><br />

                <button type="submit">Generate First Page</button>
            </form>
        </div>
    );
}

export default Cptest4;
