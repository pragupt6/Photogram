import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
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
				<Navbar bg='dark' variant='dark'>
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
						<Navbar.Toggle />
						{userInfo ? <Navbar.Collapse className='justify-content-around'>
							<Navbar.Text>Signed in as: {`${userInfo.email}`}</Navbar.Text>
							<Navbar.Text><Button onClick={logoutHandler}>Logout</Button></Navbar.Text>
						</Navbar.Collapse> : ''}
					</Container>
				</Navbar>
			</header>
		</>
	)
}

export default Header
