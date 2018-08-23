import React from 'react';
import config from '../../config';
import { AsyncStorage, Alert } from 'react-native';
import Navigation from '../navigation/Navigation';

// INITIAL STATE
const initialState = {
	user: null,
	gameFound: null,
	game: null
};

const HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	setUser = user => {
		this.setState({
			user: user
		});
	};

	getCategories = async () => {
		console.log('getting categories');
		try {
			let response = await fetch(`${config.ROOT_URL}/categories`, {
				method: 'GET',
				headers: HEADERS
			});
			let responseJson = await response.json();
			console.log('categories gotten:', responseJson.length);
			this.setState({
				catsFromBackend: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	findGameById = async id => {
		console.log('looking for game', id);
		try {
			let response = await fetch(`${config.ROOT_URL}/games/${id}`, {
				method: 'GET',
				headers: HEADERS
			});
			let responseJson = await response.json();
			// console.log('game started!', responseJson);
			this.setState({
				game: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	clearGameSearch = () => {
		this.setState({
			gameFound: null
		});
	};

	generateBoard = difficulty => {
		let newBoard = new Generator();
		return newBoard.generate(difficulty);
	};

	startGame = async data => {
		// console.log('Start game data', data);
		try {
			let response = await fetch(`${config.ROOT_URL}/games`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					editions: [{ title: 'firstEdition', editionNum: 1 }],
					organizer: data.organizer,
					avatars: data.avatars
				})
			});
			let responseJson = await response.json();
			// console.log('game started', responseJson);
			this.setState({
				game: responseJson
				// user: data.players[0]
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	findGameByAddCode = async addCode => {
		try {
			let response = await fetch(`${config.ROOT_URL}/games/search`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					addCode: addCode
				})
			});
			let responseJson = await response.json();
			// console.log('game found!', responseJson);
			this.setState({
				gameFound: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	updateGame = game => {
		this.setState({
			game: game
		});
	};

	render() {
		return (
			<AppContext.Provider
				value={{
					avatars: this.state.avatars,
					user: this.state.user,
					setUser: this.setUser,
					startGame: this.startGame,
					game: this.state.game,
					updateGame: this.updateGame,
					findGameByAddCode: this.findGameByAddCode,
					gameFound: this.state.gameFound,
					clearGameSearch: this.clearGameSearch,
					findGameById: this.findGameById,
					generateBoard: this.generateBoard
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
