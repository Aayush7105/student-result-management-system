import React from "react";

function StudentList({
  students,
  onLoadStudents,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onViewDetails,
}) {
  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const buttonStyle = {
    padding: "0.625rem 1.25rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "Inter, Arial, sans-serif",
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Inter, Arial, sans-serif", // ★ APPLY SANS-SERIF HERE
      }}
    >
      <h2
        style={{
          color: "#1f2937",
          fontSize: "1.875rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          borderBottom: "3px solid #3b82f6",
          paddingBottom: "0.75rem",
        }}
      >
        Student List
      </h2>

      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onLoadStudents}
          style={{ ...buttonStyle, backgroundColor: "#3b82f6", color: "white" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#2563eb";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#3b82f6";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Load Students
        </button>

        <button
          onClick={onAddStudent}
          style={{ ...buttonStyle, backgroundColor: "#10b981", color: "white" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#059669";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#10b981";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Add Student
        </button>
      </div>

      {sortedStudents.length === 0 ? (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "2px dashed #d1d5db",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.1rem",
              margin: 0,
              fontFamily: "Inter, Arial, sans-serif",
            }}
          >
            No students loaded. Click "Load Students" to begin.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: "0.95rem",
              fontFamily: "Inter, Arial, sans-serif",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                {["Sr No", "Name", "Section", "Marks", "Grade", "Actions"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "2px solid #e5e7eb",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {sortedStudents.map((stu, index) => (
                <tr
                  key={stu.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "1rem",
                      color: "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      padding: "1rem",
                      color: "#1f2937",
                      fontWeight: "500",
                    }}
                  >
                    {stu.name}
                  </td>

                  <td style={{ padding: "1rem", color: "#4b5563" }}>
                    {stu.section}
                  </td>

                  <td style={{ padding: "1rem", color: "#4b5563" }}>
                    {stu.marks}
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        backgroundColor: stu.grade.startsWith("A")
                          ? "#d1fae5"
                          : stu.grade === "B"
                          ? "#dbeafe"
                          : stu.grade === "C"
                          ? "#fef3c7"
                          : "#fee2e2",
                        color: stu.grade.startsWith("A")
                          ? "#065f46"
                          : stu.grade === "B"
                          ? "#1e40af"
                          : stu.grade === "C"
                          ? "#92400e"
                          : "#991b1b",
                      }}
                    >
                      {stu.grade}
                    </span>
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* VIEW BUTTON */}
                      <button
                        onClick={() => onViewDetails(stu)}
                        style={{
                          ...buttonStyle,
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#2563eb")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#3b82f6")
                        }
                      >
                        View
                      </button>

                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => onEditStudent(stu)}
                        style={{
                          ...buttonStyle,
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#f59e0b",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d97706")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#f59e0b")
                        }
                      >
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => onDeleteStudent(stu.id)}
                        style={{
                          ...buttonStyle,
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#ef4444",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#dc2626")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#ef4444")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
