import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

// COMPONENT IMPORTS

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default class NumberOptions extends React.Component {
	generateNumberButtons = () => {
		return NUMBERS.map(num => {
			return (
				<TouchableHighlight style={styles.btn} key={num} onPress={() => this.props.chooseNum(num)}>
					<Text style={styles.btnText}>{num}</Text>
				</TouchableHighlight>
			);
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight style={styles.btn} onPress={() => this.props.notesMode()}>
					<Text style={styles.btnText}>✎</Text>
				</TouchableHighlight>
				{this.generateNumberButtons()}
				<TouchableHighlight style={styles.btn} onPress={() => this.props.erase()}>
					<Text style={styles.btnText}>✄</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},
	btn: {
		width: '9%',
		aspectRatio: 1,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'blue',
		borderStyle: 'solid',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnText: {
		fontSize: 18
	}
});
