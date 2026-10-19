
function StudentDetails({ student }) {
  if (!student) {
    return (
      <div className="student-details">
        <h2>Student Details</h2>
        <p>No student details submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="student-details">
      <h2>Student Details</h2>

      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Roll Number:</strong> {student.rollNumber}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Marks:</strong> {student.marks} / 100</p>
    </div>
  );
}

export default StudentDetails;
