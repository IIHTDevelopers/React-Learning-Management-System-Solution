import React, { useState, useEffect } from 'react';

function Student() {
    const [students, setStudents] = useState([]);
    const [newStudentName, setNewStudentName] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/students')
            .then((response) => response.json())
            .then((data) => setStudents(data));
    }, []);

    const handleAddStudent = (e) => {
        e.preventDefault();
        const newStudent = {
            name: newStudentName,
        };

        fetch('http://localhost:4000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                setStudents(students.concat(data));
                setNewStudentName('');
            });
    };

    return (
        <div>
            <h2>Students</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
            <h3>Add a New Student</h3>
            <form onSubmit={handleAddStudent}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default Student;
