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
  //   const handleEditPatient = async (patient: Patient) => {

  //   }
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

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
  const deletePatient = async (id: number) => {
    try {
      await httpClient.delete(`/my-patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };
  const handleEditPatient = async (patient: Patient) => {


    if(!patient) {
        console.error("Patient object is not available for editing")
        return
    }

    const updatedPatient: Partial<Patient> = {};

      const resp = await httpClient.put(`/patients`,updatedPatient);
      console.log("Patient updated", resp.data);
      setEditingPatient(null);
      fetchPatients();
    }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (!editingPatient) return;

    setEditingPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value ? value : prevPatient[name],
    }));
    console.log(`previous value for ${name} ${previousValue}`);
  };
  return (
    <div>
      <h2>MyPatients</h2>
      <div className="row">
        {patients.map((patient) => (
          <div key={patient.id} className="col-md-4 mb-4">
            <PatientCard
              key={patient.id}
              patient={patient}
              handleEdit={handleEditPatient}
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
              value={editingPatient?.firstName || ""}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="lastName"
              value={editingPatient?.lastName || ""}
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
