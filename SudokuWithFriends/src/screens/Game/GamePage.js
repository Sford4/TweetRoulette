import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';
import Generator from '../../func/generate';
import Checker from '../../func/checker';

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

// COMPONENT IMPORTS
import SudokuBoard from './SudokuBoard';

export default class GamePage extends React.Component {
	constructor(props) {
		super(props);
		let newBoard = new Generator();
		this.state = {
			board: newBoard.generate(this.props.navigation.getParam('difficulty', 'easy')),
			name: this.props.navigation.getParam('name', 'Friend')
		};

		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
		// GET BOARD DATA
		console.log('name', this.state.name);
		console.log('board at gamepage', this.state.board);
	}

	boardComponent = board => {
		if (board) {
			return <SudokuBoard board={board} name={this.state.name} updateBoard={this.updateBoard} />;
		} else {
			console.log('no board');
			return <View><Text>Waiting on board...</Text></View>;
		}
	};

	updateBoard = board => {
		this.setState({
			board: board
		});
		this.checkForWin(board);
	};

	checkForWin = board => {
		console.log('checking for win');
		let rightLengthArray = [];
		let valuesToCheck = [];
		let currRow = [];
		board.map(row => {
			row.map(square => {
				if (square.value === '.') {
					return;
				}
				if (currRow.length < 9) {
					currRow.push(square.value);
					rightLengthArray.push(square.value);
				} else {
					valuesToCheck.push(currRow);
					currRow = [];
					currRow.push(square.value);
					rightLengthArray.push(square.value);
				}
			});
		});
		valuesToCheck.push(currRow);
		if (rightLengthArray.length < 81) {
			console.log('less than 81, not checking');
			return;
		}
		let boardReadyToCheck = Checker.initChecker(valuesToCheck);
		console.log('board to check', boardReadyToCheck);
		if (Checker.isValid(boardReadyToCheck)) {
			Alert.alert(
				'NICE!!',
				'You completed the board!',
				[{ text: 'OK', onPress: () => Navigation.navigate('MainMenu') }],
				{ cancelable: false }
			);
		}
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Text>This is the game page</Text>
						{this.boardComponent(this.state.board)}
					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
