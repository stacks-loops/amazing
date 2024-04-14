import httpClient from "../httpClient";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

function SignupPage() {
  const initialValues = {
    email: "",
    password: "",
  }

  const handleSubmit = async (values : any , { setSubmitting, setFieldError }) => {

    try {
      const resp = await httpClient.post("//localhost:5000/signup", {
        email: values.email,
        password: values.password,
      });

      // good login takes you to this page
      if (resp && resp.status == 200) {
        window.location.href = "/spalla-home";
      } else {
        console.error("Unexpected response:", resp)
        setFieldError("Unexpected error")
      }

      // console.log(resp.data)
      // bad login error handling
    } catch (error) {
      console.error("error creating user", error)
      setFieldError("an error occured")
    } finally {
      setSubmitting(false)
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Valid email required"),
    password: Yup.string().required("Password required")

  })
  // Forms for login
  return (
    <div>
      <h1>Join the Spalla Network</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <ErrorMessage name="submit" component ="div" />
            </div>
          </Form>
        )}
        </Formik>
    </div>
  );
}

export default SignupPage;
