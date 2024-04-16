REQUIREMENTS
Implement Flask and SQLAlchemy in an application backend. CHECK
Include a many to many relationship. CHECK
Implement a minimum of 4 models. 2 of 4
Implement a minimum of 3 client side routes using React router. CHECK
Include full CRUD on at least 1 model, following REST conventions. NOT CHECK
Implement validations and error handling. INCLUDED BUT NOT EVERYWHERE
Implement something new not taught in the curriculum. (Check in with me to ensure the scope of your idea is appropriate.) DOLPHINATELY
Implement authentication and authorization I THINK SO? add 
 
User can:
Access the website
Create an account
Login
Stay logged in
Logout
Navigate to pages
Add a patient
View their patient(s)
Edit a patient
Delete a patient
NOT see others patients
Schedule an appointment

† It's ok if your CRUD takes place on different models, as long as there is full CRUD
†† Please discuss with me if you have any issues aligning these requirements with your project.

STACK

Flask application that authenticates using server side session

flask
flask-sqlalchemy
flask-bcrypt
python-dotenv
flask-session
redis
axios
flask-cors
prettier
formik



cd client
npm run dev to open with vite

to migrate
flask db migrate -m ""
"when target database is not up to date"vvv
flask db upgrade

to EDIT app.db
Navigate to flask-server
open in sqlite3
    cd flask-server
    sqlite3 app.db

ctrl shift p 
wrap
whatever html wrapper you want

  try:
        patients = Patient.query.all()
        serialized_patients = []
        for patient in patients:
            serialized_patient = {
                "id": patient.id,
                "firstName": patient.first_name,
                "lastName": patient.last_name,
                "dob": patient.dob.strftime('%Y-%m-%d'),
                "age": patient.age,
                "patientPhone": patient.patient_phone,
                "patientEmail": patient.patient_email,
                "patientAddress": patient.patient_address,
                "hospitalName": patient.hsopital_name,
                "roomNumber": patient.room_number,
                "healthConcerns": patient.healht_concerns

            }
            serialized_patients.append(serialized_patient)
        return jsonify(serialized_patients), 200
    except Exception as e:
        return jsonify({"error", str(e)}), 500
    # try:


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

  #     @property
#     def password_hash(self):
#         return self._password_hash
    
#     @password_hash.setter
#     def password_hash(self, password):
#         byte_object = password.encode('utf-8')
#         bcrypt_hash = bcrypt.generate_password_hash(byte_object)
#         hash_object_as_string = bcrypt_hash.decode('utf-8')
#         self._password_hash = hash_object_as_string
