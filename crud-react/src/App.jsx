import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: "" });
  const [editMode, setEditMode] = useState(false);

  // Fetch students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${form.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ id: "", name: "", email: "", age: "" });
      setEditMode(false);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Student Management</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          required
          disabled={editMode}
          style={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editMode ? "Update" : "Add"}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setForm({ id: "", name: "", email: "", age: "" });
              setEditMode(false);
            }}
            style={{ ...styles.button, backgroundColor: "#6c757d" }}
          >
            Cancel
          </button>
        )}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{s.id}</td>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.email}</td>
                <td style={styles.td}>{s.age}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(s)}
                    style={{ ...styles.button, backgroundColor: "#0d6efd" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ ...styles.button, backgroundColor: "#dc3545" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan="5">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#333",
  },
  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minWidth: "120px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#198754",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  },
};

export default App;
