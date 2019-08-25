import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import '../assets/stylesheets/Form.css';
import axios from 'axios';
import '../assets/stylesheets/Loader.css';

export class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			email: '',
			message: '',
			submit: false,
			success: Boolean,
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		// console.log(this.state.message);
		this.setState({
			loading: true
		});
		const URL = 'https://1jqwp5g673.execute-api.us-west-2.amazonaws.com/prod/handlerForContactUs';

		axios
			.post(
				URL,
				JSON.stringify({
					name: this.state.name,
					phone: this.state.phone,
					email: this.state.email,
					desc: this.state.message
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						statusCode: 200,
						body: "{'result':'Success.'}"
					}
				}
			)
			.then((res) => {
				// console.log(res);
				this.setState({
					loading: false,
					submit: true,
					success: true
				});
			})
			.catch((err) => {
				// console.log(err);
				this.setState({
					loading: false,
					submit: true,
					success: false
				});
			});
	}

	renderForm() {
		return (
			<div className="Form">
				<h1>Contact Us</h1>
				<MuiThemeProvider>
					<React.Fragment>
						<form method="post" onSubmit={this.handleSubmit}>
							<TextField
								required
								fullWidth
								hintText="Enter your Name"
								floatingLabelText="Name"
								onChange={this.handleChange}
								name="name"
								className="Form-TextField"
							/>
							<TextField
								required
								fullWidth
								hintText="Enter your phone"
								floatingLabelText="Phone number Format: 123-456-7890"
								onChange={this.handleChange}
								name="phone"
								className="Form-TextField"
								type="tel"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							/>
							<TextField
								required
								fullWidth
								hintText="Enter your email"
								floatingLabelText="Email"
								onChange={this.handleChange}
								name="email"
								className="Form-TextField"
							/>
							<TextField
								required
								multiLine
								fullWidth
								hintText="Enter your message for us"
								floatingLabelText="Message"
								onChange={this.handleChange}
								rows={5}
								name="message"
								className="Form-TextField Message"
							/>
							<Button variant="contained" color="primary" type="submit" className="Form-submitButton">
								Submit
							</Button>
						</form>
					</React.Fragment>
				</MuiThemeProvider>
			</div>
		);
	}

	renderSuccess() {
		return (
			<div className="Form">
				<h1>Thank you for your response.</h1>
				<i className="lni-phone" />
				<h2>Our representative will contact you shortly.</h2>
			</div>
		);
	}
	renderFailure() {
		return (
			<div className="Form">
				<h1>Oops! Something went wrong.</h1>
				<i className="lni-warning" />
				<h3>Please try again or use a different browser if the issue persists.</h3>
			</div>
		);
	}
	renderLoader() {
		return (
			<div className="Form">
				<div id="loader">
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
			</div>
		);
	}

	render() {
		if (this.state.loading) {
			return this.renderLoader();
		} else if (this.state.success && this.state.submit) {
			return this.renderSuccess();
		} else if (!this.state.success && this.state.submit) {
			return this.renderFailure();
		} else {
			return this.renderForm();
		}
	}
}

export default Form;
