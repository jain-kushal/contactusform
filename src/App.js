import React from 'react';
import './App.css';
import Form from './components/Form';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<div className="App">
			<div className="App-container">
				<Sidebar />
				<Form />
			</div>
		</div>
	);
}

export default App;
