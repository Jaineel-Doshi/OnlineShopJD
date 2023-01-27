import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/userActions'




function RegisterScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // message if password doesn't match
    const [message, setMessage] = useState('')



    const dispatch = useDispatch()
    // split redirect by equal symbol
    const redirect = location.search ? location.search.split('=')[1] : "/"

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log('Submitted')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))

        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* if passwords don't match print message */}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label><small>Name</small></Form.Label>
                    <Form.Control required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label><small>Email Address</small></Form.Label>
                    <Form.Control required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='py-3'>
                    <Form.Label><small>Password</small></Form.Label>
                    <Form.Control required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className='py-3'>
                    <Form.Label><small>Confirm Password</small></Form.Label>
                    <Form.Control required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>


            <Row className='py-3'>
                <Col>
                    <small>Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link></small>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
