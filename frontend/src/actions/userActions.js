import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_LOGOUT } from '../constants/userConstants'

import axios from 'axios'

const registerAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/users/create', { email, password }, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('photpAppLoginUser', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/users/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('photpAppLoginUser', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}
const logout = () => (dispatch) => {
    localStorage.removeItem('photpAppLoginUser')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
}
export { login, logout, registerAction }