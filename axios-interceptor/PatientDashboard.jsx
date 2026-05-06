import React, { useEffect, useState } from "react";
import axiosInstance, { apiLogs } from "./axiosInstance";

function PatientDashboard() {
  const [logs, setLogs] = useState([]);

  const callAPIs = async () => {
    try {
      await axiosInstance.get("/users");
      await axiosInstance.get("/posts");
    } catch (err) {
      console.log(err);
    }

    setLogs([...apiLogs]);
  };

  useEffect(() => {
    callAPIs();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Axios Interceptor Dashboard</h2>

      <button onClick={callAPIs} style={styles.button}>
        Call APIs
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>URL</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.type}</td>
              <td>{log.url}</td>
              <td>{log.status || "-"}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center"
  },
  button: {
    padding: "10px 20px",
    marginBottom: "20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};

export default PatientDashboard;
