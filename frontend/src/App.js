import logo from './logo.svg'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
	return (
		<>
			<Router>
				<Header />
				<main className='py-3'>
					<Container>
						<Route path='/' component={HomeScreen} exact />
						<Route path='/login' component={LoginScreen} exact />
						<Route path='/register' component={RegisterScreen} exact />
					</Container>
				</main>
			</Router>
		</>
	)
}

export default App
