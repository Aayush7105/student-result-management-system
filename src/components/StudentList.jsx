import React from "react";

function StudentList({
  students,
  onLoadStudents,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onViewDetails,
}) {
  // ✅ SORT STUDENTS BY NAME (ALPHABETICAL ORDER)
  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <h2>Student List (Alphabetical Order)</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={onLoadStudents}>Load Students</button>
        <button onClick={onAddStudent} style={{ marginLeft: "0.5rem" }}>
          Add Student
        </button>
      </div>

      {sortedStudents.length === 0 ? (
        <p>No students loaded. Click "Load Students".</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Sr No</th> {/* ✅ SERIAL NUMBER */}
              <th>Name</th>
              <th>Section</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedStudents.map((stu, index) => (
              <tr key={stu.id}>
                <td>{index + 1}</td> {/* ✅ SERIAL DISPLAY */}
                <td>{stu.name}</td>
                <td>{stu.section}</td>
                <td>{stu.marks}</td>
                <td>{stu.grade}</td>
                <td>
                  <button onClick={() => onViewDetails(stu)}>View</button>

                  <button
                    onClick={() => onEditStudent(stu)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteStudent(stu.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
