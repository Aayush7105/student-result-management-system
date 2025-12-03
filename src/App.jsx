import React, { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'form' | 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formMode, setFormMode] = useState("add"); // 'add' | 'edit'

  // 1. READ - Load Students
  const handleLoadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert("Error loading students: " + error.message);
    }
  };

  // 2. CREATE - Add Student Button
  const handleAddStudentClick = () => {
    setFormMode("add");
    setSelectedStudent(null);
    setCurrentView("form");
  };

  // 3. UPDATE - Edit button
  const handleEditStudentClick = (student) => {
    setFormMode("edit");
    setSelectedStudent(student);
    setCurrentView("form");
  };

  // 4. DELETE - Delete button
  const handleDeleteStudentClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Student deleted successfully. Click 'Load Students' to refresh.");
      // Not auto-refreshing to respect the requirement
    } catch (error) {
      alert("Error deleting student: " + error.message);
    }
  };

  // 5. VIEW DETAILS
  const handleViewDetailsClick = (student) => {
    setSelectedStudent(student);
    setCurrentView("details");
  };

  // FORM SUBMIT: Used for both Add + Edit
  const handleFormSubmit = async (studentData) => {
    try {
      if (formMode === "add") {
        await createStudent(studentData);
        alert("Student added successfully. Click 'Load Students' to see it.");
      } else if (formMode === "edit" && selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
        alert(
          "Student updated successfully. Click 'Load Students' to refresh."
        );
      }

      setCurrentView("list");
    } catch (error) {
      alert("Error saving student: " + error.message);
    }
  };

  const handleCancelForm = () => {
    setCurrentView("list");
  };

  const handleBackToList = () => {
    setCurrentView("list");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Student Result App</h1>
      <hr />

      {currentView === "list" && (
        <StudentList
          students={students}
          onLoadStudents={handleLoadStudents}
          onAddStudent={handleAddStudentClick}
          onEditStudent={handleEditStudentClick}
          onDeleteStudent={handleDeleteStudentClick}
          onViewDetails={handleViewDetailsClick}
        />
      )}

      {currentView === "form" && (
        <StudentForm
          mode={formMode}
          initialData={selectedStudent}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      )}

      {currentView === "details" && (
        <StudentDetails student={selectedStudent} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default App;
