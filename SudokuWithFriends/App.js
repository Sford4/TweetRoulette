import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// COMPONENT IMPORTS
import { AppProvider } from './src/context/context';
import Navigation from './src/navigation/Navigation';
import MainMenu from './src/screens/MainMenu';
import Options from './src/screens/Options';
import StartGame from './src/screens/StartGame/StartGamePage';
import Game from './src/screens/Game/Game';
import Rules from './src/screens/Rules';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppProvider>
				<AppStackNavigator
					ref={navigatorRef => {
						Navigation.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</AppProvider>
		);
	}
}

const AppStackNavigator = createStackNavigator(
	{
		MainMenu: MainMenu,
		Options: Options,
		StartGame: StartGame,
		Game: Game,
		Rules: Rules
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);
