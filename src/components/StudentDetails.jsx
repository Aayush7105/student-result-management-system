import React from "react";

function StudentDetails({ student, onBack }) {
  if (!student) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
          No student selected.
        </p>
        <button
          onClick={onBack}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "2.5rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          color: "#1f2937",
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "2rem",
          borderBottom: "3px solid #3b82f6",
          paddingBottom: "0.75rem",
        }}
      >
        Student Details
      </h2>

      <div style={{ display: "grid", gap: "1.25rem" }}>
        {[
          { label: "ID", value: student.id },
          { label: "Name", value: student.name },
          { label: "Section", value: student.section },
          { label: "Marks", value: student.marks },
          { label: "Grade", value: student.grade },
        ].map((field, idx) => (
          <div
            key={idx}
            style={{
              padding: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {field.label}:
            </strong>
            <span
              style={{
                color: "#1f2937",
                fontSize: "1.125rem",
                fontWeight: "500",
              }}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: "pointer",
          width: "100%",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
      >
        Back to List
      </button>
    </div>
  );
}

export default StudentDetails;
