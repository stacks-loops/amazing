import { useState } from 'react'
import { Box, Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik'
import * as yup from 'yup'

function Auth({ setUser })  {
    const [signup, setSignup] = useState(true)

    const signupSchema = yup.object().shape({
        username: yup.string()
        .min(5, 'Username must be greater than 5 characters')
        .max(25, 'Username must be less than 25 characters'),
        password: yup.string()
        .min(5, 'Username must be greater than 5 characters')
        .max(25, 'Username must be less than 25 characters'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
    })
    const loginSchema = yup.object().shape({
        username: yup.string().required('username required'),
        password: yup.string().required('password required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ' ',
            passwordConfirmation: '',
        },
        validationSchema: signup ? signupSchema : loginSchema,
        onSubmit: (values) => {
            const endpoint = signup ? '/users' : '/login'
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(values)
            }).then ((resp) => {
                if (resp.ok) {
                    resp.json().then(({ user }) => {
                        setUser(user)
                        //navigates into website
                    })
                } else {
                    console.log('handle these errors')
                }
            }) 
        }
    })

function toggleSignup() {
    setSignup((currentSignup) => !currentSignup)
}

return (
    <Container maxWidth='sm'>
        <button onClick={toggleSignup}>{signup ? 'Already have a login?' : 'Create an Account'}</button>
        <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
            id="username"
            name="username"
            placeholder="Username"
            required
            value={formik.values.username}
            onChange={formik.handleChange}
        />
          
        </form>
    </Container>
)

}

export default Auth;