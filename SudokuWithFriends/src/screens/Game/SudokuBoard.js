import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

// COMPONENT IMPORTS
import NumberOptions from './NumberOptions';

export default class SudokuBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.props.board,
			name: this.props.name
		};
	}

	generateBoard = board => {
		return board.map(row => {
			return row.map((square, index) => {
				return (
					<TouchableHighlight
						key={index}
						style={[styles.square, this.checkSelected(square)]}
						onPress={() => this.selectSquare(square.value === '.' ? square.id : false)}
					>
						<View style={styles.squareInsides}>
							<View style={styles.notesContainer}>
								{this.generateNotes(square)}
							</View>
							<Text style={[{ fontWeight: 'bold' }, this.checkIfStaticSquare(square)]}>
								{square.value === '.' ? '' : square.value}
							</Text>
						</View>
					</TouchableHighlight>
				);
			});
		});
	};

	generateNotes = square => {
		if (square.notes.length) {
			return square.notes.map((note, index) => {
				return <Text style={{ fontSize: 9 }} key={index}>{note}</Text>;
			});
		}
	};

	checkSelected = square => {
		if (this.state.squareSelected === square.id) {
			if (square.selectedBy && square.selectedBy === this.state.name) {
				// console.log('square selected by me');
				return styles.selectedMe;
			} else if (square.selectedBy && square.selectedBy !== this.state.name) {
				return styles.selectedFriend;
			}
		} else {
			return null;
		}
	};

	selectSquare = squareId => {
		// console.log('selecting square with id', squareId);
		if (squareId) {
			// console.log('selecting square with id', squareId);
			let board = this.state.board;
			board.map(row => {
				row.map(square => {
					if (square.id === squareId) {
						square.selectedBy = this.state.name;
					}
				});
			});
			this.setState({
				squareSelected: squareId
			});
		}
	};

	checkIfStaticSquare = square => {
		if (square.staticSquare) {
			return styles.staticSquare;
		} else {
			return styles.changingSquare;
		}
	};

	numChosen = num => {
		// using the squareSelected, update the num property of that square
		let board = this.state.board;
		board.map(row => {
			row.map(square => {
				if (square.id === this.state.squareSelected) {
					if (this.state.notesMode) {
						square.notes = this.addNote(square.notes, num);
					} else {
						square.value = num;
					}
				}
			});
		});
		this.setState({
			board: board
		});
		this.props.updateBoard(board);
	};

	addNote = (notes, num) => {
		if (notes.length < 4) {
			notes.push(num);
			return notes;
		} else {
			notes.shift();
			notes.push(num);
			return notes;
		}
	};

	notesMode = () => {
		this.setState({
			notesMode: !this.state.notesMode
		});
	};

	erase = () => {
		let board = this.state.board;
		board.map(row => {
			row.map(square => {
				if (square.id === this.state.squareSelected) {
					square.value = '.';
				}
			});
		});
		this.setState({
			board: board
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.boardContainer}>
					{this.generateBoard(this.state.board)}
					<View style={[styles.backgroundSquare1, styles.backgroundSquare]} />
					<View style={[styles.backgroundSquare2, styles.backgroundSquare]} />
					<View style={[styles.backgroundSquare3, styles.backgroundSquare]} />
					<View style={[styles.backgroundSquare4, styles.backgroundSquare]} />
					<View style={[styles.backgroundSquare5, styles.backgroundSquare]} />
				</View>
				<NumberOptions chooseNum={this.numChosen} notesMode={this.notesMode} erase={this.erase} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	boardContainer: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10
	},
	square: {
		borderWidth: 1,
		borderColor: '#BFBFBF',
		borderStyle: 'solid',
		width: '11.11111%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1
	},
	squareInsides: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	notesContainer: {
		position: 'absolute',
		top: 0,
		// left: 0,
		flexDirection: 'row'
	},
	backgroundSquare: {
		width: '33.33333%',
		aspectRatio: 1,
		backgroundColor: 'yellow'
	},
	backgroundSquare1: {
		position: 'absolute',
		top: 0,
		left: 0,
		marginLeft: 10
	},
	backgroundSquare2: {
		position: 'absolute',
		top: 0,
		right: 0,
		marginRight: 10
	},
	backgroundSquare3: {
		position: 'absolute',
		top: '33.33333%',
		left: '33.33333%',
		right: '33.33333%',
		bottom: '33.33333%',
		marginLeft: 10
	},
	backgroundSquare4: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginLeft: 10
	},
	backgroundSquare5: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginRight: 10
	},
	selectedMe: {
		borderColor: 'red'
	},
	selectedFriend: {
		borderColor: 'blue'
	},
	staticSquare: {
		fontWeight: 'bold',
		fontSize: 16
	},
	changingSquare: {
		color: 'green',
		fontSize: 16
	}
});
