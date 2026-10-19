
import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import "./App.css";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <div className="app">
      <h1>Student Information System</h1>

      <StudentForm onSubmit={setStudent} />

      <StudentDetails student={student} />
    </div>
  );
}

export default App;
