import {
	USER_IMAGES_REQUEST,
	USER_IMAGES_SUCCESS,
	USER_IMAGES_FAIL,
	USER_IMAGES_UPLOAD_REQUEST,
	USER_IMAGES_UPLOAD_SUCCESS,
	USER_IMAGES_UPLOAD_FAIL,
} from '../constants/imageConstants'

const getAllImagesReducer = (state = { images: [] }, action) => {
	switch (action.type) {
		case USER_IMAGES_REQUEST:
			return {
				...state,
				loading: true,
			}
		case USER_IMAGES_SUCCESS:
			return {
				...state,
				loading: false,
				images: action.payload,
			}
		case USER_IMAGES_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
const uploadImagesReducer = (state = { image: [] }, action) => {
	switch (action.type) {
		case USER_IMAGES_UPLOAD_REQUEST:
			return {
				...state,
				loading: true,
			}
		case USER_IMAGES_UPLOAD_SUCCESS:
			return {
				...state,
				loading: false,
				image: action.payload,
			}
		case USER_IMAGES_UPLOAD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export { getAllImagesReducer, uploadImagesReducer }
