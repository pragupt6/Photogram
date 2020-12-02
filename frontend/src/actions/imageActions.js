import { BlobServiceClient } from '@azure/storage-blob'

import axios from 'axios'
import {
	USER_IMAGES_REQUEST,
	USER_IMAGES_SUCCESS,
	USER_IMAGES_FAIL,
	USER_IMAGES_UPLOAD_FAIL,
	USER_IMAGES_UPLOAD_REQUEST,
	USER_IMAGES_UPLOAD_SUCCESS,
} from '../constants/imageConstants'
// import { InteractiveBrowserCredential } from '@azure/identity'
// we're using these objects from the storage sdk - there are others for different needs
// import { BlobServiceClient, BlobItem } from '@azure/storage-blob'

const getAllImages = (id) => async (dispatch, getState) => {
	// let blobsWeFound = []
	// let containerUrl = ''
	try {
		dispatch({ type: USER_IMAGES_REQUEST })
		//console.log(await axios.get('/api/getimages'))
		const {
			userLogin: { userInfo },
		} = getState()
		const { data } = await axios.get('/api/getimages', {
			params: {
				userid: userInfo._id,
				isAdmin: userInfo.isAdmin
			}
		})
		const images = data.images
		images.sort(
			(a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
		)
		images.reverse()
		// console.log(data.blobImages)
		dispatch({
			type: USER_IMAGES_SUCCESS,
			payload: images,
		})
	} catch (error) {
		dispatch({
			type: USER_IMAGES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
const uploadImage = (formdata) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
		dispatch({ type: USER_IMAGES_UPLOAD_REQUEST })
		console.log(formdata);
		await axios.post('/api/putimage', formdata, config)
		dispatch({
			type: USER_IMAGES_UPLOAD_SUCCESS,
			payload: [{ imagesrc: 'https://picsum.photos/200' }],
		})
	} catch (error) {
		dispatch({
			type: USER_IMAGES_UPLOAD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export { uploadImage, getAllImages }
