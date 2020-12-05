import React from 'react'
import { Navbar, Container, Button, Nav, NavDropdown, Text } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../logo.svg'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'


const Header = () => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<>
			<header>
				<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
					<Container>
						<LinkContainer to='/'>
							<Navbar.Brand>
								<img
									alt=''
									src={logo}
									width='50'
									height='50'
									className='d-inline-block'
								/>{' '}
								Photogram
							</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="mr-auto">
								{/* <Nav.Link href="#features">Features</Nav.Link>
								<Nav.Link href="#pricing">Pricing</Nav.Link> */}

							</Nav>
							<Nav>
								{userInfo ? <><Navbar.Text>Signed is as: </Navbar.Text>
									<NavDropdown title={`${userInfo.email}`} id="collasible-nav-dropdown">
										<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
									</NavDropdown></> : <LinkContainer to='/login'><Navbar.Text><i className='far fa-user' style={{ color: '#fff' }}>{' '}Sign in</i></Navbar.Text></LinkContainer>}
							</Nav>
						</Navbar.Collapse>

					</Container>
				</Navbar>
			</header>
		</>
	)
}

export default Header
