import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	getAllImagesReducer,
	uploadImagesReducer,
} from './reducers/imageReducer'
import {
	userLoginReducer,
	userRegisterReducer,

} from './reducers/userReducers'

const reducuer = combineReducers({
	imageList: getAllImagesReducer,
	imageUpload: uploadImagesReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,

})
const userFromLocalStorage = localStorage.getItem('photpAppLoginUser')
	? JSON.parse(localStorage.getItem('photpAppLoginUser'))
	: null

const initialState = {
	userLogin: {
		userInfo: userFromLocalStorage,
	},
}

const middleware = [thunk]

const store = createStore(
	reducuer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
