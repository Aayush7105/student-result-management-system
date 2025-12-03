import React, { useState } from "react";

function StudentForm({ mode, initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [section, setSection] = useState(initialData?.section || "");
  const [marks, setMarks] = useState(initialData?.marks || "");
  const [grade, setGrade] = useState(initialData?.grade || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      name,
      section,
      marks: Number(marks),
      grade,
    };

    onSubmit(student);
  };

  return (
    <div>
      <h2>{mode === "edit" ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Section:{" "}
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Marks:{" "}
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Grade:{" "}
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">
          {mode === "edit" ? "Save Changes" : "Add Student"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
