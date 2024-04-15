import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import { Formik } from "formik";
import axios from "axios";

function AddPatientForm() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("User was not authenticated");
      }
    })();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/add-patient",
        values
      );
      console.log(resp.data);
      window.location.href = "/spalla-home";
    } catch (error) {
      console.error("Error adding this patient", error);
    }
  };

  return (
    <div>
      <h1>AddPatient</h1>
      <h3>ID: {user?.id}</h3>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dob: "",
          age: "",
          patientPhone: "",
          patientEmail: "",
          patientAddress: "",
          hospitalName: "",
          roomNumber: "",
          healthConcerns: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
              />
            </label>
            <label>
              Patient Phone:
              <input
                type="tel"
                name="patientPhone"
                value={values.patientPhone}
                onChange={handleChange}
              />
            </label>
            <label>
              Patient Address:
              <input
                type="text"
                name="patientAddress"
                value={values.patientAddress}
                onChange={handleChange}
              />
            </label>
            <label>
              Hospital Name:
              <input
                type="text"
                name="hospitalName"
                value={values.hospitalName}
                onChange={handleChange}
              />
            </label>
            <label>
              Room Number:
              <input
                type="number"
                name="roomNumber"
                value={values.roomNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Health Concerns:
              <textarea
                name="healthConcerns"
                value={values.healthConcerns}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddPatientForm;
