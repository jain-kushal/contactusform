import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';

import '../assets/stylesheets/Form.css';

export class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: Number,
			email: '',
			message: '',
			submit: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.setState({
			submit: true
		});
	}
	renderForm() {
		return (
			<div className="Form">
				<h1>Contact Us</h1>
				<MuiThemeProvider>
					<React.Fragment>
						<form onSubmit={this.handleSubmit}>
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
								floatingLabelText="Phone number"
								onChange={this.handleChange}
								name="phone"
								className="Form-TextField"
								type="tel"
							/>
							<TextField
								required
								fullWidth
								hintText="Enter your email"
								floatingLabelText="Email"
								onChange={this.handleChange}
								type="email"
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
								rows="5"
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

	render() {
		if (this.state.submit) {
			return (
				<div className="Form">
					<h1>Thank you for your response.</h1>
					<i class="lni-phone" />
					<h2>Our representative will contact you shortly.</h2>
				</div>
			);
		} else {
			return this.renderForm();
		}
	}
}

export default Form;
