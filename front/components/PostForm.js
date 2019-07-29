import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd'

const PostForm = ({ imagePaths }) => {
	return (
		<>
			<Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
				<Input.TextArea maxLength={140} placeholder='How was your day?'/>
				<div>
					<input type="file" multiple hidden/>
					<Button>Upload Image</Button>
					<Button type="primary" htmlType="submit">TWIT</Button>
				</div>
				<div>
					{
						!!imagePaths
						&& imagePaths.map((v) => {
							return (
								<div key={v}>
									<img src={`http://localhost:3000/${v}`} alt={v}/>
									<div>
										<Button>Remove</Button>
									</div>
								</div>
							)
						})
					}
				</div>
			</Form>
		</>
	)
};

PostForm.propTypes = {
	imagePaths: PropTypes.array
}

export default PostForm;