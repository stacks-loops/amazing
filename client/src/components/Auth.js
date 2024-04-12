import { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Auth({ setUser })  {
    const [signup, setSignup] = useState(true)
    const navigate = useNavigate()

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

    const initialValues = {
        username: '',
        password: '',
        passwrodConfirmation: ''
    }

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
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signup ? signupSchema : loginSchema}
            >
            {(props) => {
                return (
                    <form className='form' onSubmit={formik.handleSubmit}>
                        <Field name='username' placeholder='Username' />
                        {props.errors.username && props.touched.username ? (
                            <div>{props.errors.username}</div>
                        ) : null}
                        <label htmlFor='password'>Passwrod:</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={props.values.password}
                            onChange={props.handleChange}
                        />
                                {signup && <>
                                    <label htmlFor='phase'>Phase:</label>
                                    <input 
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    type='password'
                                    placeholder="Passwrod Confirmation"
                                    value={props.values.passwordConfirmation}
                                    onChange={props.handleChange}
                                />
                            </>}
                        <button type="submit">SUBMIT</button>
                    </form>

                )}
            }
            
        
            </Formik>
        </Container>
    )
}

export default Auth;