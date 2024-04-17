import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";
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
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClearAssociations = async () => {
    try {
      await httpClient.delete("/clear-associations");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Error clearing associations", error);
      setErrorMessage("Error clearing associations: " + error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const nursesResp = await httpClient.get("/nurses");
        setNurses(nursesResp.data);

        const hospitalResp = await httpClient.get("/hospitals");
        setHospitals(hospitalResp.data);
      } catch (error: any) {
        console.error("Error fetching data", error);
        setErrorMessage("Error fetching data: " + error.message);
      }
    }
    fetchData();
  }, []);
  const createRel = async (nurseId: number, hospitalId: number) => {
    try {
      const response = await httpClient.post("/nurse-hosp-rel", {
        nurseId,
        hospitalId,
      });

      const data = await response.data();
      console.log("Relationship established", data);

      if (response.status == 201) {
        setErrorMessage("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Relationship already exists");
      } else {
        console.error("Error creating relationship", error);
        setErrorMessage("Error creating relationship: " + error.message);
      }
    }
  };
  const handleCloseError = () => {
    setErrorMessage("");
  };

  return (
    <div>
      <h2>Hospitals and Nurses</h2>
      <h4>Select A Hospital </h4>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            {hospital.name}
            <Link to="#" onClick={() => setSelectedHospitalId(hospital.id)}>
              Select
            </Link>
          </li>
        ))}
      </ul>
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
      {errorMessage && (
        <ErrorModal message={errorMessage} onClose={handleCloseError} />
      )}
      <button onClick={handleClearAssociations}> Clear All Hospital-Nurse Associations</button>
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")}/>}
    </div>
  );
}

export default Providers;
