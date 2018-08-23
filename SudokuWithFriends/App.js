import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// COMPONENT IMPORTS
import { AppProvider } from './src/context/context';
import Navigation from './src/navigation/Navigation';
import MainMenu from './src/screens/MainMenu';
import Options from './src/screens/Options';
import StartGame from './src/screens/StartGame/StartGamePage';
import GamePage from './src/screens/Game/GamePage';

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
		StartGame: StartGame,
		MainMenu: MainMenu,
		Options: Options,

		Game: GamePage
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);
