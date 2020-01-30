import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		status && setUsers(users => [...users, status]);
	}, [status]);

	return (
		<div>
			<Form>
				<label htmlFor="name">
					Name
					<Field id="name" type="text" name="name" placeholder="Name" />
					{touched.name && errors.name && (
						<p>{errors.name}</p>
					)}
				</label>
				<label htmlFor="email">
					Email
					<Field id="email" type="text" name="email" placeholder="E-mail" />
					{touched.email && errors.email && (
						<p>{errors.email}</p>
					)}
				</label>
				<label htmlFor="password">
					Password
					<Field
						id="password"
						type="password"
						name="password"
						placeholder="Password"
					/>
					{touched.password && errors.passoword && (
						<p>{errors.password}</p>
					)}
				</label>
				<label>
					TOS
					<Field type="checkbox" name="tos" checked={values.tos} />
					<span className="checkmark" />
				</label>
				<button type="submit">Submit!</button>
			</Form>
			{users.map(user => {
				return (
					<ul key={user.id}>
						<li>Name: {user.name}</li>
						<li>Email: {user.email}</li>
						<li>Password: {user.password}</li>
						<li>TOS: {user.tos}</li>
					</ul>
				);
			})}
		</div>
	);
};

const FormikUserForm = withFormik({
	
	mapPropsToValues(props) {
	
		return {
			name: props.name || "",
			email: props.email || "",
			password: props.password || "",
			tos: props.tos || false,
			
		};
	},

	
	validationSchema: Yup.object().shape({
		name: Yup.string().required(),
		
        email: Yup.string().required(),
        
        password: Yup.string().required() 
	}),

	
	handleSubmit(values, { setStatus, resetForm }) {
		
		axios
			.post("https://reqres.in/api/users/", values)
			.then(res => {
				console.log("from axios", res);
				
				setStatus(res.data);

				resetForm();
			})
			.catch(err => console.log(err.response));
	}
})(UserForm);
export default FormikUserForm;
