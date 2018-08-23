import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, AsyncStorage } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import AwesomeAlert from 'react-native-awesome-alerts';
import Header from '../components/header';

// STYLES IMPORTS
import masterStyles from '../../styles/masterStyles';

const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane', 'why'];

class StartGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			difficulty: 'easy'
		};
		this._retrieveData();
	}

	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('SudokuName');
			if (value !== null) {
				this.setState({
					name: value
				});
			}
		} catch (error) {
			console.log('error retrieving name');
		}
	};

	generateDifficultyBtns = difficulties => {
		return difficulties.map((dif, index) => {
			return (
				<TouchableHighlight
					key={index}
					style={this.state.difficulty === dif ? styles.chosen : styles.notChosen}
					onPress={() => this.setState({ difficulty: dif })}
				>
					<Text>{dif.toUpperCase()}</Text>
				</TouchableHighlight>
			);
		});
	};
	startGame = username => {
		if (!username) {
			Alert.alert('Please enter your name!');
			return;
		}
		AsyncStorage.setItem('SudokuName', this.state.name);
		Navigation.navigate('Game', { name: this.state.name, difficulty: this.state.difficulty });
	};

	render() {
		return (
			<View style={styles.container}>
				<Header title="Start a Game!" />
				<Text>Your Name</Text>
				<TextInput
					style={masterStyles.input}
					placeholder="e.g. Sarah"
					onChangeText={text => this.setState({ name: text })}
					value={this.state.name}
				/>
				{this.generateDifficultyBtns(DIFFICULTIES)}
				<TouchableHighlight style={styles.nextBtn} onPress={() => this.startGame(this.state.name)}>
					<Text>Next</Text>
				</TouchableHighlight>
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
	},
	chosen: {
		backgroundColor: 'yellow'
	},
	notChosen: {
		backgroundColor: 'white'
	}
});
