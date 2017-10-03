import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			query: '',
			artist: null,
			tracks: []
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
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/';


		var accessToken='BQB5msEvC34hmw22xA3dnBqNqWczBKR5JZRKkuMtYy8dCHWpdieYeL8lUTGqPE6RGMpBLuw_QAT_LNJNKvQZ-tyPUChaVBJaIKoGasIc25bxqdhtdF_Ewl5geMoKzp5gVmCapoapatIJx347Q-Kg17N_myqG2fN11Q&refresh_token=AQD7YJ4-sL6iyTt_-KyKsH2O1CzIYxOGyipw0p46ythScwqS0l0Pvt-zY54VCoWMliHEGRv1kaxQLEmlhLiZ3IrqcmYeT8TjpjH_pFXkrqpusC1BRtHOo6n5mRzxnR5r95k';
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

				FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
				fetch(FETCH_URL, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + accessToken
					}
				})
				.then(response=>response.json())
				.then(json=> {
					console.log('artist\'s top tracks:', json);
					const { tracks } = json; //same as const tracks = json.tracks
					this.setState({tracks});
				})
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
				{
					this.state.artist !== null
					?
					<div>
						<Profile 
							artist={this.state.artist}
						/>
						<div className="Gallery">
							Gallery
						</div>
					</div>
					: <div></div>
				}
			</div>
		)
	}
}

export default App; 