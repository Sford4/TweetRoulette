import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';
import Join from './Join';
import AwesomeAlert from 'react-native-awesome-alerts';

class JoinPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'search',
			game: this.props.game
		};
		this.display = (
			<Join
				goToGame={this.goToGame}
				findGameById={this.props.findGameById}
				findGameByAddCode={this.props.findGameByAddCode}
				clearGameSearch={this.props.clearGameSearch}
				gameFound={this.props.gameFound}
				game={this.props.game}
			/>
		);
	}

	componentWillUpdate(NextProps, NextState) {
		if (NextState.screen === 'search') {
			this.display = (
				<Join
					goToGame={this.goToGame}
					findGameById={NextProps.findGameById}
					findGameByAddCode={NextProps.findGameByAddCode}
					clearGameSearch={NextProps.clearGameSearch}
					gameFound={NextProps.gameFound}
					game={NextProps.game}
				/>
			);
		}
	}

	goToGame = user => {
		Navigation.navigate('Game');
	};
	render() {
		return (
			<View style={styles.container}>
				<Header title="Join a Game!" />
				{this.display}
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <JoinPage {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
