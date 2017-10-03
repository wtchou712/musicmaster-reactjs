import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			query: '',
			artist: null
		}
	}

	getAccessToken(){
		//incomplete, will need updating
		var refreshToken = 'AQBxgVubvF_fTDoAbg0BAVc1_EXCihsCsc0KsvAhkGVyeEO4z3gVLltRWp-PYUU66iuvvtkksf3sF2L2nKBotfACgzI6UufuKfgnBRSQgNEFmNkroVWsfvXu2s-4_qRCXGY';
		const BASE_URL = 'https://accounts.spotify.com/api/token?';
		const FETCH_URL =`${BASE_URL}grant_type=refresh_token&refresh_token=${refreshToken}`;

		console.log('FETCH_URL', FETCH_URL);

		fetch(FETCH_URL, {
			method: 'POST', 
			headers: {
				'Authorization': 'Basic ' + refreshToken
			}, 
			mode: 'no-cors', 
			cache: 'default'
		})
		.then(response=>console.log(response));
	}

	search(){
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

		var accessToken='BQA4uxH20l99hkNMqy-704SJrhD6--sRlTdBCO_GpS0D3q77ntUEL3U9A1i4j1cNqbsRMnKWAsriwt_K8D56vjB-uGXbkzeFeSrLMo1122i6cME6acc_j_ioxDfL_Lugt9ySOSiciLvLkFaIHcv6VzMwNRulYEpeYg&refresh_token=AQB_rIC8mRXkpMNBvDLkowSEU45Y6Aoi_rgeR_adgn2YiQCoA7pn92CMawfM2Z4qUP8H9sznpsEcZTXdnjGSLYJnb6FFmAUK3yldYB9Kau6vHzlTcrAKIwJGaWJvRNVntb4';
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
			.then(json=> {
				const artist = json.artists.items[0];
				console.log('artist', artist);
				this.setState({artist});
			})
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
				<Profile 
					artist={this.state.artist}
				/>
				<div className="Gallery">
					Gallery
				</div>
			</div>
		)
	}
}

export default App; 