import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Hospital } from "./flask-server/models/hospital.model";

interface Nurse {
  id: number;
  nurse_name: string;
}

function Providers() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const resp = await httpClient.get<Hospital[]>("/hospitals");
        setHospitals(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospitals();
  }, []);
  return (
    <div>
      <h1>Hospitals and Nurses</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <h2>{hospital.name}</h2>
            <ul>
              <li>
                <strong>Nurses:</strong>
              </li>
              {hospital.associated_nurses?.map((nurse: Nurse) => (
                <li key={nurse.id}>{nurse.nurse_name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Providers;
