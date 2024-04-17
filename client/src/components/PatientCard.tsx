import { FormEvent } from "react";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  age: number;
  patient_phone: string;
  patient_email: string;
  patient_address: string;
  hospital_name: string;
  room_number: number;
  health_concerns: string;
}

interface PatientCardProps {
  patient: Patient;
  handleEdit: (patient: Patient) => void;
  handleDelete?: () => void;
}

function PatientCard({ patient, handleEdit, handleDelete }: PatientCardProps) {
  const handleClickEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit(patient);
  };
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title">
          {patient.first_name} {patient.last_name}
        </h5>
      </div>
      <div className="card-body" style={{ minHeight: "400px" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Date of Birth: {patient.birthday}</li>
          <li className="list-group-item">Age: {patient.age}</li>
          <li className="list-group-item">Phone: {patient.patient_phone}</li>
          <li className="list-group-item">Email: {patient.patient_email}</li>
          <li className="list-group-item">
            Address: {patient.patient_address}
          </li>
          <li className="list-group-item">Hospital: {patient.hospital_name}</li>
          <li className="list-group-item">
            Room Number: {patient.room_number}
          </li>
          <li className="list-group-item">
            Health Concerns: {patient.health_concerns}
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <form onSubmit={handleClickEdit}>
          <button id="editButton" type="submit">
            Edit
          </button>
        </form>
        {handleDelete && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}

export default PatientCard;
