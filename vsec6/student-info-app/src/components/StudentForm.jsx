
import { useState } from "react";

function StudentForm({ onSubmit }) {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    department: "",
    marks: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(student);

    setStudent({
      name: "",
      rollNumber: "",
      department: "",
      marks: ""
    });
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Student Form</h2>

      <label>Student Name</label>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        required
      />

      <label>Roll Number</label>
      <input
        type="text"
        name="rollNumber"
        value={student.rollNumber}
        onChange={handleChange}
        required
      />

      <label>Department</label>
      <input
        type="text"
        name="department"
        value={student.department}
        onChange={handleChange}
        required
      />

      <label>Marks (0-100)</label>
      <input
        type="number"
        name="marks"
        min="0"
        max="100"
        value={student.marks}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit Details</button>
    </form>
  );
}

export default StudentForm;
