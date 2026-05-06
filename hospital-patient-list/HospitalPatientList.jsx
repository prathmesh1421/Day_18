import React, { useEffect, useState } from "react";

function HospitalPatientList() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = await response.json();

      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError("Failed to fetch patient data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // 🔹 Search Only
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPatients(filtered);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Hospital Patient List</h2>

        {/* 🔹 Search */}
        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={handleSearch}
          style={styles.search}
        />

        <button onClick={fetchPatients} style={styles.button}>
          Refresh List
        </button>

        {loading && <p>Loading patients...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* 🔹 List */}
        {!loading &&
          filteredPatients.map((patient) => (
            <div key={patient.id} style={styles.patientCard}>
              <h3>{patient.name}</h3>
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
              <p>City: {patient.address?.city}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: "650px",
    padding: "30px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    color: "#333"
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "15px",
    fontSize: "14px",
    transition: "0.3s"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "0.3s"
  },

  patientCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "#f8f9ff",
    marginBottom: "12px",
    borderLeft: "5px solid #667eea",
    transition: "0.3s"
  },

  error: {
    color: "#ff4d4f",
    textAlign: "center",
    marginTop: "10px"
  }
};

export default HospitalPatientList;
