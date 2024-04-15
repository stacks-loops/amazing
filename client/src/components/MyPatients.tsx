import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import httpClient from "../httpClient";

interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    age: number;
    patientPhone: string;
    patientEmail: string;
    patientAddress: string;
    hospitalName: string;
    roomNumber: number;
    healthConcerns: string;

}

function MyPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
//   console.log(patients)
  //   const [newPatient, setNewPatient] = useState({
  //     firstName: "",
  //     lastName: "",
  //     dob: "",
  //     age: "",
  //     patientPhone: "",
  //     patientEmail: "",
  //     patientAddress: "",
  //     hospitalName: "",
  //     roomNumber: "",
  //     healthConcerns: "",
  //   });
  const [editingPatient, setEditingPatient] = useState<any>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const resp = await httpClient.get("//localhost:5000/patients");
      console.log("Response from the server is here", resp.data);
      setPatients(resp.data);
      console.log(patients)
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  //   const addPatient = async () => {
  //     try {
  //       await axios.post("/patients", newPatient);
  //       setNewPatient({
  //         firstName: "",
  //         lastName: "",
  //         dob: "",
  //         age: "",
  //         patientPhone: "",
  //         patientEmail: "",
  //         patientddress: "",
  //         hospitalName: "",
  //         roomNumber: "",
  //         healthConcerns: "",
  //       });
  //       //refresh here
  //       fetchPatients();
  //     } catch (error) {
  //       console.error("Error adding new patient:", error);
  //     }
  // //   };
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setNewPatient((prevPatient) => ({
  //       ...prevPatient,
  //       [name]: value,
  //     }));
  //   };
  const editPatient = async (id: number) => {
    try {
        const updatedPatient = { ...editingPatient };
      const resp = await axios.put(`/patients/${id}`, updatedPatient);
      console.log("Patient updated", resp.data)
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      console.error("Error updating patient", error);
    }
  };
  const deletePatient = async (id: number) => {
    try {
      await axios.delete(`/my-patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingPatient((prevPatient: any) => ({
        ...prevPatient,
        [name]: value,
    }))
  }
  return (
    <div>
      <h2>MyPatients</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Hospital</th>
            <th>Room Number</th>
            <th>Health Concerns</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.dob}</td>
              <td>{patient.age}</td>
              <td>{patient.patientPhone}</td>
              <td>{patient.patientEmail}</td>
              <td>{patient.patientAddress}</td>
              <td>{patient.hospitalName}</td>
              <td>{patient.roomNumber}</td>
              <td>{patient.healthConcerns}</td>
              <td>
                <button onClick={() => editPatient(patient.id)}>Edit</button>
                <button onClick={() => setEditingPatient(patient)}>Edit</button>
                <button onClick={() => deletePatient(patient.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPatient && (
        <div>
          <h2>Edit Patient</h2>
          <form onSubmit={() => editingPatient(editingPatient.id)}>
            <input
              type="text"
              name="firstName"
              value={editingPatient.firstName}
              onChange={handleChange}
            />
            <button type="submit">Update Patient Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MyPatients;

// fetch all patients FULL CRUD Requirement hit here
// render patients that have an association wiht the session id
// duplicate or move the addpatient button?
// implement an edit patient button?
// delete patient button
