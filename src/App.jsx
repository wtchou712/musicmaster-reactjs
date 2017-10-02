import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			query: ''
		}
	}

	search(){
		console.log('this.state', this.state);
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		console.log('FETCH_URL', FETCH_URL);
		var accessToken = 'BQDhaF2N6pS5fASCIZurPEdngda8z0Ci5G3P7xDWlYDbxvUPpdqf8g5vmxlzIwGWXhP9xjhZ7Aix6yvForPgL3sdab8-6O7SaYRXmU3WtfHRu9p8htrJAZ1K7Y4fCpCV3vyKWwSZTw4SU1_wDcHqz0aEyZyDVDQupw&refresh_token=AQCPPXfNhnK0XK4EAB9ydRI0x_K7lRBI0SExU9fwWvg6BQPbOuY-MUHsAYP8Ua_yBdQxQH6cjoNCnrRm8cI_e352KJEMRC44vJ1gycjwm1ce2iDBNksa2QqvcljpiV0PJd4'

		var myOptions = {
			method: 'GET', 
			headers: {
				'Authorization': 'Bearer ' + accessToken
			},
			mode: 'cors', 
			cache: 'default'
		};

		fetch(FETCH_URL, myOptions)
			.then(response=>response.json())
			.then(json=>console.log(json))
	}

	render(){
		return(
			<div className="App"> 
				<div className="App-title">Music Master</div>
				<FormGroup> 
					<InputGroup>
						<FormControl
							type="text"
							placeholder="Search for an Artist"
							value={this.state.query}
							onChange={event => {this.setState({query: event.target.value})}}
							onKeyPress={event => {
								if (event.key === 'Enter'){
									this.search()
								}
							}}
						/>
						<InputGroup.Addon onClick={() => this.search()}>
							<Glyphicon glyph="search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup> 
				<div className="Profile">
					<div>Artist Picture</div>
					<div>Artist Name</div>
				</div>
				<div className="Gallery">
					Gallery
				</div>
			</div>
		)
	}
}

export default App; 