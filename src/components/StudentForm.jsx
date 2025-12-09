import React, { useState, useEffect } from "react";
import { CheckCircle, X, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

// Tailwind + Framer Motion version of StudentForm
// Usage: <StudentForm mode="add" initialData={...} onSubmit={fn} onCancel={fn} />

export default function StudentForm({
  mode = "add",
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [section, setSection] = useState(initialData?.section || "");
  const [marks, setMarks] = useState(initialData?.marks ?? "");
  const [grade, setGrade] = useState(initialData?.grade || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // update grade when marks change
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

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;
    const student = {
      ...initialData,
      name: name.trim(),
      section: section.trim(),
      marks: Number(marks),
      grade: grade || calculateGrade(Number(marks)),
    };
    onSubmit(student);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {mode === "edit" ? (
            <Edit3 className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            {mode === "edit" ? "Edit Student" : "Add Student"}
          </h3>
          <p className="text-sm text-slate-500">
            Quickly add or update student details. Grade is auto-calculated from
            marks.
          </p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Name
          </label>
          <input
            className={`mt-2 w-full p-3 rounded-lg border ${
              errors.name ? "border-rose-400" : "border-slate-200"
            } focus:outline-none focus:ring-2 focus:ring-sky-300`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
          />
          {errors.name && (
            <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Section
          </label>
          <input
            className={`mt-2 w-full p-3 rounded-lg border ${
              errors.section ? "border-rose-400" : "border-slate-200"
            } focus:outline-none focus:ring-2 focus:ring-sky-300`}
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. A1"
          />
          {errors.section && (
            <p className="text-rose-500 text-xs mt-1">{errors.section}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Marks (0 - 100)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            className={`mt-2 w-full p-3 rounded-lg border ${
              errors.marks ? "border-rose-400" : "border-slate-200"
            } focus:outline-none focus:ring-2 focus:ring-sky-300`}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="e.g. 85"
          />
          {errors.marks && (
            <p className="text-rose-500 text-xs mt-1">{errors.marks}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Grade (auto)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              readOnly
              value={grade}
              className="flex-1 p-3 rounded-lg bg-slate-50 border border-slate-100 font-semibold"
            />
            <div
              className={`px-3 py-2 rounded-md text-sm font-semibold ${
                grade === "A+" || grade === "A"
                  ? "bg-green-100 text-green-800"
                  : grade === "B"
                  ? "bg-amber-100 text-amber-800"
                  : grade === "C" || grade === "D"
                  ? "bg-rose-100 text-rose-800"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {grade || "--"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-sm transition"
        >
          {mode === "edit" ? "Save Changes" : "Add Student"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}
