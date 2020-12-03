import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import store from './store'
import SimpleReactLightbox from 'simple-react-lightbox'
ReactDOM.render(
	<Provider store={store}>
		{/* <SimpleReactLightbox> */}
		<App />
		{/* </SimpleReactLightbox> */}
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
