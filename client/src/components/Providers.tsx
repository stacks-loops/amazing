import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom"
import ErrorModal from "./ErrorModal";

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
    const [errorMessage, setErrorMessage] = useState<string>("");


  useEffect(() => {
    async function fetchData() {
        try {
            const nursesResp = await httpClient.get('/nurses');
            setNurses(nursesResp.data);

            const hospitalResp = await httpClient.get('/hospitals')
            setHospitals(hospitalResp.data);
        } catch (error: any) {
            console.error('Error fetching data', error)
            setErrorMessage("Error fetching data: " + error.message)
        }
    }
    fetchData();
}, []);
     const createRel = async (nurseId: number, hospitalId: number) => {
        try {
            const response = await httpClient.post('/nurse-hosp-rel', { nurseId, hospitalId });
    
            const data = await response.data()
            console.log('Relationship established', data)

            if (response.status == 201) {
                setErrorMessage("");
            }

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Relationship already exists")
        } else {
            console.error('Error creating relationship', error)
            setErrorMessage("Error creating relationship: " + error.message)
        }
        }
     }
     const handleCloseError = () => {
        setErrorMessage("")
     }
        
  return (
    <div>
      <h1>Hospitals and Nurses</h1>
      <ul>
        {nurses.map((nurse) => (
          <li key={nurse.id}>
            {nurse.nurse_name}
            <button onClick={() => createRel(nurse.id, selectedHospitalId!)}>
                Assign Nurse to This Hospital
            </button>
         </li>
        ))}
      </ul>
      <h1>Select A Hospitals</h1>
      <ul>
        {hospitals.map(hospital => (
            <li key={hospital.id}>
                {hospital.name}
                <Link to='#' onClick={() => setSelectedHospitalId(hospital.id)}>Associate Nurses</Link>
            </li>
        ))}
      </ul>
      {errorMessage && <ErrorModal message={errorMessage} onClose={handleCloseError}/>}
    </div>
  );
}

export default Providers;
