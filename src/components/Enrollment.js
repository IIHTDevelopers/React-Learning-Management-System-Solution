import React, { useState, useEffect } from 'react';

function Enrollment() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [progressUpdate, setProgressUpdate] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/students')
            .then((response) => response.json())
            .then((data) => setStudents(data));

        fetch('http://localhost:4000/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data));

        fetch('http://localhost:4000/enrollments')
            .then((response) => response.json())
            .then((data) => setEnrollments(data));
    }, []);

    const handleEnrollment = (e) => {
        e.preventDefault();
        const newEnrollment = {
            studentId: selectedStudent,
            courseId: selectedCourse,
            progress: 0,
        };

        fetch('http://localhost:4000/enrollments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEnrollment),
        })
            .then(() => fetch('http://localhost:4000/enrollments')
                .then((response) => response.json())
                .then((data) => setEnrollments(data)))
            .then(() => {
                alert('Enrollment successful!');
                setSelectedStudent('');
                setSelectedCourse('');
            });
    };

    const updateProgress = (enrollmentId, newProgress) => {
        fetch(`http://localhost:4000/enrollments/${enrollmentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ progress: newProgress }),
        })
            .then(() => fetch('http://localhost:4000/enrollments')
                .then((response) => response.json())
                .then((data) => setEnrollments(data)))
            .then(() => {
                alert('Progress updated successfully!');
            });
    };

    const handleProgressChange = (enrollmentId, value) => {
        setProgressUpdate({ ...progressUpdate, [enrollmentId]: value });
    };

    const handleProgressSubmit = (enrollmentId) => {
        const newProgress = progressUpdate[enrollmentId];
        updateProgress(enrollmentId, newProgress);
    };

    const findStudentNameById = (studentId) => {
        const student = students.find(student => student.id.toString() === studentId.toString());
        return student ? student.name : '';
    };

    const findCourseNameById = (courseId) => {
        const course = courses.find(course => course.id.toString() === courseId.toString());
        return course ? course.title : '';
    };

    return (
        <div>
            <h2>Enroll Student in Course</h2>
            <form onSubmit={handleEnrollment}>
                <div>
                    <label>
                        Select Student:
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            required
                        >
                            <option value="">Select a student</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Select Course:
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            required
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Enroll</button>
            </form>

            <h3>Enrollments</h3>
            <ul>
                {enrollments.map((enrollment) => (
                    <li key={enrollment.id}>
                        {findStudentNameById(enrollment.studentId)} - {findCourseNameById(enrollment.courseId)} - Progress: {enrollment.progress}%
                        <div>
                            <input
                                type="number"
                                value={progressUpdate[enrollment.id] || enrollment.progress}
                                onChange={(e) => handleProgressChange(enrollment.id, e.target.value)}
                                min="0" max="100"
                            />
                            <button onClick={() => handleProgressSubmit(enrollment.id)}>Update Progress</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default Enrollment;
