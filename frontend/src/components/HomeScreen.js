import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllImages, uploadImage } from '../actions/imageActions'
import { Container, Image, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import axios from 'axios'
import { motion } from 'framer-motion';
import { SRLWrapper } from "simple-react-lightbox";
const HomeScreen = ({ history }) => {
	const [filename, setFilename] = useState('Select an image to upload...')
	const [msg, setMsg] = useState('')
	const [uploadProgress, setUploadProgress] = useState(false)
	const [file1, setFile] = useState(null)
	const [upload, setUpload] = useState('')
	const dispatch = useDispatch()
	const imageList = useSelector((state) => state.imageList)
	const { loading, images, error } = imageList
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	useEffect(() => {
		if (userInfo) {
			dispatch(getAllImages(userInfo._id))
		}
	}, [dispatch, history, upload])
	const submitHandler = async (e) => {
		e.preventDefault()
		const file = file1
		const formData = new FormData()
		formData.append('image', file)
		formData.append('userid', userInfo._id)

		try {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			}
			setUploadProgress(true);
			// console.log(await axios.post('/api/upload', formData, config));
			await axios.post('/api/upload', formData, config)
				.then(response => {
					console.log(response.data);
					setUpload(response.data)
					// setUpload(response.data)
					setMsg('')
					setFilename('Select an image to upload...')
					setFile(null)
				})
				.catch(error => {
					if (error && error.response && error.response.data["Error"] !== undefined) {
						setMsg(error.response.data["Error"])
					} else {
						setMsg('Images only!')
					}
				})

		} catch (error) {
			console.error(error)
		} finally {
			setUploadProgress(false);
		}
	}
	const handleFile = async (e) => {
		if (e.target.files[0]) {
			setFilename(e.target.files[0].name)
			setFile(e.target.files[0])
		}
	}
	return (
		<>
			{!userInfo && <div className="d-flex justify-content-center align-items-center">Please &nbsp;<Link to='/login'>sign in</Link>&nbsp;to see your stuff!</div>}
			{ userInfo && <Row>
				<Col>
					{uploadProgress && <>
						<ProgressBar animated striped variant="success" label="Uploading in progress..." now={100} />
					</>}
					<Form encType="multipart/form-data" onSubmit={submitHandler}>

						<div className='d-flex flex-column align-items-center'>

							{!uploadProgress && <div className='d-flex w-100'>
								<div className='input-group'>
									<Form.File
										id='custom-file'
										label={filename}
										custom
										className='w-80'
										onChange={handleFile}
										className='w-50'
									/>
								</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
								<div>
									<Button variant='outline' className='btn-outline-primary w-20' type='submit'><i className="fa fa-upload" aria-label='upload' alt='upload'></i></Button>
								</div>
							</div>}
							<div className='mt-3'>
								{msg !== '' ? <Message variant='danger'>{msg}</Message> : ''}
								{/* <Button>Error</Button> */}
							</div>
						</div>
					</Form>
				</Col>
			</Row>}
			{ userInfo && <SRLWrapper><Row className='py-3 px-4'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : images.length === 0 ? <Message variant='danger'>No Images found</Message> : (
					images.map((image) => {
						return (
							<Col
								key={image.imageURL}
								sm={12}
								md={6}
								lg={4}
								xl={3}
								className='py-2'
							>

								<Image
									src={image.imageURL}
									thumbnail
									fluid
									className='img-fluid'
								// style={{ height: '250px', width: '250px' }}
								/>
								{/* </SRLWrapper> */}
							</Col>
						)
					})
				)}
			</Row></SRLWrapper>}
		</>

	)
}

export default HomeScreen
