import React, { useState } from "react";

function StudentForm({ mode, initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [section, setSection] = useState(initialData?.section || "");
  const [marks, setMarks] = useState(initialData?.marks || "");
  const [grade, setGrade] = useState(initialData?.grade || "");

  // ✅ AUTOMATIC GRADE CALCULATION FUNCTION
  const calculateGrade = (marksValue) => {
    const m = Number(marksValue);

    if (m >= 90) return "A+";
    if (m >= 80) return "A";
    if (m >= 70) return "B";
    if (m >= 60) return "C";
    if (m >= 50) return "D";
    return "F";
  };

  // ✅ WHEN MARKS CHANGE → AUTO UPDATE GRADE
  const handleMarksChange = (e) => {
    const value = e.target.value;
    setMarks(value);

    const autoGrade = calculateGrade(value);
    setGrade(autoGrade);
  };

  const handleSubmit = () => {
    if (!name || !section || !marks) {
      alert("Please fill in all fields");
      return;
    }

    const student = {
      name,
      section,
      marks: Number(marks),
      grade, // ✅ auto-assigned
    };

    onSubmit(student);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    color: "#374151",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
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
        {mode === "edit" ? "Edit Student" : "Add Student"}
      </h2>

      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Section</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Marks (0-100)</label>
          <input
            type="number"
            value={marks}
            onChange={handleMarksChange} // ✅ auto grade trigger
            min="0"
            max="100"
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={labelStyle}>Grade (Auto-calculated)</label>
          <input
            type="text"
            value={grade}
            readOnly // ✅ user CANNOT edit manually
            style={{
              ...inputStyle,
              backgroundColor: "#f3f4f6",
              cursor: "not-allowed",
              fontWeight: "600",
              color: "#1f2937",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: "0.875rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
          >
            {mode === "edit" ? "Save Changes" : "Add Student"}
          </button>

          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "0.875rem",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4b5563")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6b7280")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
