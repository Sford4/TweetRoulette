import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';
import ChooseAvatar from '../../screens/components/chooseAvatar';

export default class SelectAvatar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			img: '0',
			username: this.props.username ? this.props.username : null
		};
	}

	saveImg = img => {
		console.log('img to be saved', img.img);
		this.setState({
			img: img.img
		});
	};

	changePage = page => {
		this.props.saveAvatar(this.state.img.toString());
		this.props.saveUsername(this.state.username);
		if (page === 'PreGame') {
			this.props.startGame(this.state.img.toString(), this.state.username);
		} else {
			this.props.goToPage(page);
		}
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title="Start Game!" />
						<View style={styles.mainBody}>
							<Text style={masterStyles.subtitle}>Select your Name and Character</Text>
							<ChooseAvatar avatars={context.avatars} saveImg={this.saveImg} />
							<View style={styles.nameSection}>
								<Text style={{ fontSize: 20, marginBottom: 5, fontWeight: 'bold' }}>Your Name</Text>
								<TextInput
									style={masterStyles.input}
									placeholder="e.g. John"
									onChangeText={text => this.setState({ username: text })}
									value={this.state.username}
									maxLength={25}
								/>
							</View>
						</View>

						<View style={styles.bottomBtns}>
							<TouchableHighlight style={masterStyles.halfButton} onPress={() => this.changePage('type')}>
								<Text style={masterStyles.btnText}>Back</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={masterStyles.halfButton}
								onPress={() => this.props.startGame(this.state.img, this.state.username)}
							>
								<Text style={masterStyles.btnText}>Next</Text>
							</TouchableHighlight>
						</View>

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
		justifyContent: 'space-between'
	},
	mainContainer: {
		height: '50%',
		display: 'flex',
		justifyContent: 'space-around'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start',
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	bottomBtns: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 10
	},
	mainBody: {
		height: '70%',
		width: '90%'
	},
	nameSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
