import React, { useState, useEffect } from 'react';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);

    const handleAddCourse = (e) => {
        e.preventDefault();
        const newCourse = {
            title: newCourseTitle,
            description: newCourseDescription,
        };

        fetch('http://localhost:4000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        })
            .then((response) => response.json())
            .then((data) => {
                setCourses(courses.concat(data));
                setNewCourseTitle('');
                setNewCourseDescription('');
            });
    };

    return (
        <div>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>{course.title} - {course.description}</li>
                ))}
            </ul>
            <h3>Add a New Course</h3>
            <form onSubmit={handleAddCourse}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={newCourseTitle}
                            onChange={(e) => setNewCourseTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={newCourseDescription}
                            onChange={(e) => setNewCourseDescription(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
}

export default Courses;
