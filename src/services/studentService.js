const API_URL = "http://localhost:3001/students";

// GET all students
export async function getStudents() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

// POST - create new student
export async function createStudent(student) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}

// PUT - update student
export async function updateStudent(id, student) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  return response.json();
}

// DELETE - delete student
export async function deleteStudent(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
}
