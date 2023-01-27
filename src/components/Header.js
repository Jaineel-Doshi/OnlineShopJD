import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../redux/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout());
        window.location.reload(false);
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>JDShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <SearchBox className='ms-auto' />

                        <Nav className="ms-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link className='h5'><i className="fa-solid fa-cart-shopping"></i>Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' className='h5'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        {/* <NavDropdown.Item>Logout</NavDropdown.Item> */}

                                    </LinkContainer>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fa-solid fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </header >
    )
}

export default Header