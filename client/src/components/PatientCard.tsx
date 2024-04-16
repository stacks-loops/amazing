import React from 'react';
import MyPatients from './MyPatients';
import { FormEvent } from 'react';

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

interface PatientCardProps {
  patient: Patient;
  handleEdit: (patient: Patient) => void;
  handleDelete?: () => void;
}

function PatientCard({ patient, handleEdit }: PatientCardProps) {
  const handleClickEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit(patient)
  }
  return (
    <div className="card mb-4">
      <div className="card-header">
      <h5 className="card-title">{patient.firstName} {patient.lastName}</h5>
    </div>
      <div className="card-body">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Date of Birth: {patient.dob}</li>
        <li className="list-group-item">Age: {patient.age}</li>
        <li className="list-group-item">Phone: {patient.patientPhone}</li>
        <li className="list-group-item">Email: {patient.patientEmail}</li>
        <li className="list-group-item">Address: {patient.patientAddress}</li>
        <li className="list-group-item">Hospital: {patient.hospitalName}</li>
        <li className="list-group-item">Room Number: {patient.roomNumber}</li>
        <li className="list-group-item">Health Concerns: {patient.healthConcerns}</li>
      </ul>
      </div>
      <div>
          <form onSubmit={handleClickEdit}>
            <button id="editButton" type="submit">Edit</button>
            </form>
    
      </div>
      </div>
  )
}

export default PatientCard;




