import React, { useState } from "react";
import "./SemesterDetails.css";
import Button from "@mui/material/Button";

const SemesterDetails = () => {
  const [courses, setCourses] = useState([{ id: 1 }]);

  const addCourse = () => {
    setCourses([...courses, { id: courses.length + 1 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="semester-details-container">
      <h2>Semester Details</h2>
      <form onSubmit={handleSubmit}>
        {courses.map((course) => (
          <div key={course.id} className="course-container">
            <h3>Course {course.id}</h3>
            <div className="row">
              <div className="input-group">
                <label>Theory/Practical</label>
                <input type="text" placeholder="Theory/Practical" />
              </div>
              <div className="input-group">
                <label>Course Code</label>
                <input type="text" placeholder="Course Code" />
              </div>
            </div>
            <div className="row">
              <div className="input-group full-width">
                <label>Course Title</label>
                <input type="text" placeholder="Course Title" />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>T (Tutorials)</label>
                <input type="number" placeholder="T" />
              </div>
              <div className="input-group">
                <label>L (Lectures)</label>
                <input type="number" placeholder="L" />
              </div>
              <div className="input-group">
                <label>P (Practical)</label>
                <input type="number" placeholder="P" />
              </div>
              <div className="input-group">
                <label>C (Credits)</label>
                <input type="number" placeholder="C" />
              </div>
            </div>
          </div>
        ))}
        <div className="action-buttons">
          <Button variant="outlined" onClick={addCourse}>
            Add Course
          </Button>
          <Button variant="contained" color="success">
            Submit
          </Button>
          
        </div>
      </form>
    </div>
  );
};

export default SemesterDetails;
