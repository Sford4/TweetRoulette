import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import SelectAvatar from './SelectAvatar';
import AwesomeAlert from 'react-native-awesome-alerts';

class StartGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: '0',
			username: null
		};
	}

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.game) {
			// console.log("game we're going to", NextProps.game);
			Navigation.navigate('Game');
		}
	}

	saveAvatar = img => {
		// console.log('img at save avatar', img);
		this.setState({
			avatar: img.toString()
		});
	};

	saveUsername = username => {
		this.setState({
			username: username
		});
	};

	startGame = (img, username) => {
		if (!username) {
			Alert.alert('Please enter your name!');
			return;
		}
		console.log('STARTING GAME!', img);
		this.props.startGame({
			organizer: username,
			avatars: [img]
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<SelectAvatar
					goToPage={this.goToPage}
					saveAvatar={this.saveAvatar}
					saveUsername={this.saveUsername}
					username={this.state.username}
					avatar={this.state.avatar}
					startGame={this.startGame}
				/>

			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <StartGamePage {...props} />}
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
