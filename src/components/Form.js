import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { Card, CardBody, CardText, Button } from "reactstrap";


const StyledCard = styled(Card)`
    width: 65%;
    margin:1%;
`;

const CardGrid = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
    margin-left: 25%;
    margin-top: 2%;
    margin-bottom: 2%;
`;

const StyledForm = styled(Form)`
    display:flex;
    justify-content:center;
    
`;

const StyledLabel = styled.label`
    margin:.5%;
    color:red;
    
`;

const StyledLabel2 = styled.label`
	margin: 0.5%;
    font-weight: bold;
    display:flex;
    justify-content:space-between;
    width:50px;
    align-items:center;
    height:30px;
`;

const UserForm = ({ values, errors, touched, status }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		status && setUsers(users => [...users, status]);
	}, [status]);

	return (
		<div>
			<StyledForm>
				<StyledLabel htmlFor="name">
					<Field id="name" type="text" name="name" placeholder="Name" />
					{touched.name && errors.name && <p>{errors.name}</p>}
				</StyledLabel>
				<StyledLabel htmlFor="email">
					<Field id="email" type="text" name="email" placeholder="E-mail" />
					{touched.email && errors.email && <p>{errors.email}</p>}
				</StyledLabel>
				<StyledLabel htmlFor="password">
					<Field
						id="password"
						type="password"
						name="password"
						placeholder="Password"
					/>
					{touched.password && errors.password && <p>{errors.password}</p>}
				</StyledLabel>
				<StyledLabel2>
					TOS
					<Field type="checkbox" name="tos" checked={values.tos} />
                    
				</StyledLabel2>
				<Button type="submit" outline color="danger">
					Create User
				</Button>
			</StyledForm>

			<CardGrid>
				{users.map(user => {
					return (
						<div>
							<StyledCard body inverse color="danger">
								<CardBody>
									<CardText>
										<ul key={user.id}>
											<li>Name: {user.name}</li>
											<li>Email: {user.email}</li>
											<li>Password: {user.password}</li>
											<li> {user.tos}</li>
										</ul>
									</CardText>
								</CardBody>
							</StyledCard>
						</div>
					);
				})}
			</CardGrid>
		</div>
	);
};

const FormikUserForm = withFormik({
	mapPropsToValues(props) {
		return {
			name: props.name || "",
			email: props.email || "",
			password: props.password || "",
			tos: props.tos || false
		};
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Name is required"),

		email: Yup.string()
			.email("Invalid Email")
			.required("Email is required"),

		password: Yup.string()
			.min(4, "Too Short")
			.required("Password is required"),

		tos: Yup.boolean()
			.oneOf([true], "Please Agree to Terms of Service")
			.required()
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
