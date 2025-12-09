import React, { useState, useEffect } from "react";
import { CheckCircle, Edit3 } from "lucide-react";

export default function StudentForm({
  mode = "add",
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [section, setSection] = useState(initialData?.section || "");
  const [marks, setMarks] = useState(
    initialData?.marks !== undefined ? String(initialData.marks) : ""
  );
  const [grade, setGrade] = useState(initialData?.grade || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (marks === "" || marks === null) return setGrade("");
    const g = calculateGrade(Number(marks));
    setGrade(g);
  }, [marks]);

  const calculateGrade = (m) => {
    if (Number.isNaN(m)) return "";
    if (m >= 90) return "A+";
    if (m >= 80) return "A";
    if (m >= 70) return "B";
    if (m >= 60) return "C";
    if (m >= 50) return "D";
    return "F";
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!section.trim()) e.section = "Section is required";

    const m = Number(marks);
    if (marks === "" || Number.isNaN(m)) e.marks = "Marks must be a number";
    else if (m < 0 || m > 100) e.marks = "Marks must be between 0 and 100";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const card = {
    maxWidth: "650px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  };

  const titleBar = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #e5e7eb",
  };

  const input = (error) => ({
    width: "100%",
    padding: "0.8rem",
    border: `2px solid ${error ? "#f87171" : "#d1d5db"}`,
    borderRadius: "8px",
    fontSize: "1rem",
    marginTop: "0.4rem",
    transition: "0.2s",
  });

  const label = {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#374151",
    marginTop: "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const btn = (bg, hover) => ({
    padding: "0.9rem",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    fontSize: "1rem",
    cursor: "pointer",
    color: "white",
    background: bg,
    transition: "0.2s",
  });

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;

    const student = {
      ...initialData,
      name,
      section,
      marks: Number(marks),
      grade: grade || calculateGrade(Number(marks)),
      notes: notes.trim() || undefined,
    };
    onSubmit(student);
  };

  return (
    <form style={card} onSubmit={handleSubmit}>
      {/* Header */}
      <div style={titleBar}>
        <div
          style={{
            width: "50px",
            height: "50px",
            background:
              "linear-gradient(135deg, rgba(79,70,229), rgba(14,165,233))",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          {mode === "edit" ? <Edit3 size={26} /> : <CheckCircle size={26} />}
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700" }}>
            {mode === "edit" ? "Edit Student" : "Add Student"}
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            An improved form with clean styling and auto-grade calculation.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <label style={label}>Full Name</label>
      <input
        style={input(errors.name)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Rahul Sharma"
      />
      {errors.name && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.name}</p>
      )}

      <label style={label}>Section</label>
      <input
        style={input(errors.section)}
        value={section}
        onChange={(e) => setSection(e.target.value)}
        placeholder="e.g. A1"
      />
      {errors.section && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.section}</p>
      )}

      <label style={label}>Marks (0 - 100)</label>
      <input
        type="number"
        min="0"
        max="100"
        style={input(errors.marks)}
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        placeholder="e.g. 85"
      />
      {errors.marks && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.marks}</p>
      )}

      {/* Grade box */}
      <label style={label}>Grade (Auto)</label>
      <input
        readOnly
        value={grade}
        style={{
          ...input(false),
          background: "#f3f4f6",
          fontWeight: "700",
          cursor: "not-allowed",
        }}
      />

      {/* Notes */}
      <label style={label}>Notes (optional)</label>
      <textarea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{
          ...input(false),
          resize: "vertical",
          height: "100px",
        }}
        placeholder="Add any teacher notes or comments..."
      />

      {/* Buttons */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <button
          type="submit"
          style={btn("#0ea5e9", "#0369a1")}
          onMouseOver={(e) => (e.target.style.background = "#0369a1")}
          onMouseOut={(e) => (e.target.style.background = "#0ea5e9")}
        >
          {mode === "edit" ? "Save Changes" : "Add Student"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={btn("#6b7280", "#4b5563")}
          onMouseOver={(e) => (e.target.style.background = "#4b5563")}
          onMouseOut={(e) => (e.target.style.background = "#6b7280")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
