import React from "react";
import { ArrowLeft, UserCheck, Hash } from "lucide-react";
import { motion } from "framer-motion";

// Tailwind-based, single-file StudentDetails component
// Usage: <StudentDetails student={student} onBack={() => setView('list')} />

export default function StudentDetails({ student, onBack }) {
  if (!student) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shadow-inner">
          <UserCheck className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-slate-700 text-xl font-semibold">
          No student selected
        </h3>
        <p className="text-slate-500 text-sm text-center">
          Select a student from the list to view detailed information.
        </p>
        <button
          onClick={onBack}
          className="mt-2 w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </div>
        </button>
      </div>
    );
  }

  // derive visual grade color
  const gradeColor = (g) => {
    if (!g) return "bg-gray-300 text-gray-700";
    const grade = String(g).toUpperCase();
    if (grade === "A" || grade === "A+") return "bg-green-100 text-green-800";
    if (grade === "B") return "bg-amber-100 text-amber-800";
    if (grade === "C") return "bg-rose-100 text-rose-800";
    return "bg-slate-100 text-slate-800";
  };

  const marks = Number(student.marks ?? 0);
  const marksPct = Math.max(0, Math.min(100, Math.round((marks / 100) * 100)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto my-10 bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gradient-to-r from-blue-50 via-white to-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {(student.name || "?")
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h2 className="text-slate-900 text-2xl font-extrabold">
              {student.name}
            </h2>
            <p className="text-sm text-slate-500">
              Section •{" "}
              <span className="font-medium text-slate-700">
                {student.section}
              </span>
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColor(
              student.grade
            )}`}
          >
            Grade: {student.grade ?? "-"}
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gradient-to-b from-white to-slate-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-sm text-slate-500 uppercase tracking-wide">
            Student ID
          </h3>
          <p className="mt-2 text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" /> {student.id}
          </p>

          <div className="mt-6">
            <h4 className="text-sm text-slate-500 uppercase tracking-wide">
              Attendance (example)
            </h4>
            <div className="mt-2 text-sm text-slate-700">
              Present: <span className="font-medium">22</span> / 24
            </div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 bg-white p-6 rounded-xl border border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">
            Performance
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Quick snapshot of the student's marks and status.
          </p>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Marks</div>
              <div className="text-sm font-semibold text-slate-800">
                {marks} / 100
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${marksPct}%`,
                  background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
                }}
              ></div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="text-xs text-slate-500">Progress</div>
              <div className="text-xs font-medium text-slate-700">
                {marksPct}%
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">Section</div>
                <div className="mt-1 font-medium text-slate-800">
                  {student.section}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">Grade</div>
                <div className="mt-1 font-medium text-slate-800">
                  {student.grade ?? "-"}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-slate-600">Notes</h4>
              <p className="mt-2 text-sm text-slate-500">
                {student.notes ??
                  "No additional notes. You can add comments when editing the student."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 transition"
          >
            Back to List
          </button>

          <button
            onClick={() => alert("Edit flow not implemented in this snippet")}
            className="flex-1 py-3 rounded-lg border border-slate-200 font-semibold hover:bg-slate-50 transition"
          >
            Edit Student
          </button>
        </div>
      </div>
    </motion.div>
  );
}
