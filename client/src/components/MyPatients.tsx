import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import httpClient from "../httpClient";
import PatientCard from "./PatientCard";

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
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const resp = await httpClient.get("//localhost:5000/patients");
      console.log("Response from the server is here", resp.data);
      setPatients(resp.data);
      console.log(patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
 
  const deletePatient = async (id: number) => {
    try {
      await httpClient.delete(`/my-patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };
  const handleEditClick = (patient: Patient) => {
    setEditingPatient(patient)
  }

  const handleEditPatient = async (e: FormEvent) => {
    e.preventDefault()
    if (!editingPatient) {
      console.error("Patient object is not available for editing");
      return;
    }
    try {
      const resp = await httpClient.put(`/patients/${editingPatient.id}`, editingPatient);
      console.log("Patient updated", resp.data);
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      console.error("Error updatingggg patient", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (!editingPatient) return;

    setEditingPatient((prevPatient: Patient | null) => ({
      ...(prevPatient as Patient),
      [name]: value
    }));
  };

  return (
    <div>
      <h2>MyPatients</h2>
      <div className="row">
        {patients.map((patient) => (
          <div key={patient.id} className="col-md-4 mb-4">
            <PatientCard
              patient={patient}
              handleEdit={handleEditClick}
              handleDelete={() => deletePatient(patient.id)}
            />
          </div>
        ))}
      </div>
      {editingPatient && (
        <div>
          <h2>Edit Patient</h2>
          <form onSubmit={handleEditPatient}>
            <input
              type="text"
              name="firstName"
              value={editingPatient.firstName}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="lastName"
              value={editingPatient.lastName}
              onChange={handleChange}
            />
            <br />
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
