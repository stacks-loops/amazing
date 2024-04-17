import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom"

interface Nurse {
  id: number;
  nurse_name: string;
}

export interface Hospital {
    id: number;
    name: string;
    associated_nurses: Nurse[];
}

function Providers() {
    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
        const nursesResp = await fetch('/nurses');
        const nursesData = await nursesResp.json();
        setNurses(nursesData)

        const hospitalResp = await fetch('/hospitals');
        const hospitalData = await hospitalResp.json();
        setHospitals(hospitalData)
    }
    fetchData();
}, []);
     const createRel = async (nurseId: number, hospitalId: number) => {
        const response = await fetch('/nurse-hosp-rel', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ nurseId, hospitalId }), 
        });
        const data = await response.json();
     }
  return (
    <div>
      <h1>Hospitals and Nurses</h1>
      <ul>
        {nurses.map((nurse) => (
          <li key={nurse.id}>
            {nurse.nurse_name}
            <button onClick={() => createRel(nurse.id, selectedHospitalId!)}>
                Associate with Hospital
            </button>
         </li>
        ))}
      </ul>
      <h1>Hospitals</h1>
      <ul>
        {hospitals.map(hospital => (
            <li key={hospital.id}>
                {hospital.name}
                <Link to='#' onClick={() => setSelectedHospitalId(hospital.id)}>Associate Nurses</Link>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Providers;
