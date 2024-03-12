import React from 'react';
import Courses from './components/Courses';
import Student from './components/Student';
import Enrollment from './components/Enrollment';

function App() {
  return (
    <div>
      <h1>Learning Management System</h1>
      <Courses />
      <Student />
      <Enrollment />
    </div>
  );
}

export default App;
