import React, { Component } from 'react';
import '../assets/stylesheets/Sidebar.css';

export class Sidebar extends Component {
	render() {
		return (
			<div className="Sidebar">
				<i className="lni-customer" />
				<h3>
					<em>
						Our Vision,<br />Our best Service
					</em>
				</h3>
			</div>
		);
	}
}

export default Sidebar;
