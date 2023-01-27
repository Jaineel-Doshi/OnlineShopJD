import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../redux/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'




//     const dispatch = useDispatch()

//     const userDetails = useSelector(state => state.userDetails)
//     const { error, loading, user } = userDetails

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin


//     const userUpdateProfile = useSelector(state => state.userUpdateProfile)
//     const { success } = userUpdateProfile


//     useEffect(() => {
//         if (!userInfo) {
//             history.push('/login')
//         } else {
//             if (!user || !user.name || success) {
//                 dispatch({ type: USER_UPDATE_PROFILE_RESET })
//                 dispatch(getUserDetails('profile'))
//             } else {
//                 setName(user.name)
//                 setEmail(user.email)
//             }
//         }
//     }, [dispatch, history, userInfo, user, success])


//     const submitHandler = (e) => {
//         e.preventDefault()
//         // console.log('Submitted')
//         if (password !== confirmPassword) {
//             setMessage('Passwords do not match')
//         } else {
//             dispatch(updateUserProfile({
//                 'id': user._id,
//                 'name': name,
//                 'email': email,
//                 'password': password,
//             }))

//         }
//     }

//     return (
//         <Row>
//             <Col md={3}>
//                 <h2>User Profile</h2>

//                 {message && <Message variant='danger'>{message}</Message>}
//                 {error && <Message variant='danger'>{error}</Message>}
//                 {loading && <Loader />}
//                 <Form onSubmit={submitHandler}>

//                     <Form.Group controlId='name'>
//                         <Form.Label><small>Name</small></Form.Label>
//                         <Form.Control required
//                             type='name'
//                             placeholder='Enter name'
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId='email'>
//                         <Form.Label><small>Email Address</small></Form.Label>
//                         <Form.Control required
//                             type='email'
//                             placeholder='Enter Email'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId='password' className='py-3'>
//                         <Form.Label><small>Password</small></Form.Label>
//                         <Form.Control
//                             type='password'
//                             placeholder='Enter Password'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}>

//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId='passwordConfirm' className='py-3'>
//                         <Form.Label><small>Confirm Password</small></Form.Label>
//                         <Form.Control
//                             type='password'
//                             placeholder='Confirm Password'
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>

//                     <Button type='submit' variant='primary'>
//                         Update
//                     </Button>
//                 </Form>


//             </Col>

//             <Col md={3}>
//                 <h2>My Orders</h2>
//             </Col>
//         </Row>
//     )
// }

// This works
// if (!userInfo) {
//     history.push('/login')
// } else {
//     
//         dispatch({ type: USER_UPDATE_PROFILE_RESET })
//         dispatch(getUserDetails('profile'))
//     }
function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user, success2 } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    // const orderListMy = useSelector(state => state.orderListMy)
    // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                console.log('dispatching get user details')
            }
            else {
                setName(user.name)
                setEmail(user.email)
                console.log('setting username and password')
            }
        }
        // setName(user.name)
        // setEmail(user.email)
        // console.log('setting username and email')
        // dispatch({ type: USER_UPDATE_PROFILE_RESET })
        // dispatch(getUserDetails('profile'))




        // adding user as dependency causes infinite api loop when updating
    }, [userInfo, history, dispatch, success, success2])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
    return (
        <Row>
            <Col md={4}>
                <h2>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>

            <Col md={3}>
                {/* <h2>My Orders</h2> */}
            </Col>
            <Col md={3}>
                <h2>My Orders</h2>
                <h3><Message variant='info'>No Orders to Display</Message></h3>
            </Col>


        </Row>
    )
}


export default ProfileScreen
