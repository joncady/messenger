import React, { Component } from 'react';
import Structure from './Structure';
import UserSignUp from './components/UserSignUp';
import UserSignIn from "./components/UserSignIn";
import MessageArea from './components/MessageArea';
import firebase from 'firebase/app';
import 'firebase/auth';

class App extends Component {

	constructor() {
		super();
		this.state = {
			user: null,
			signUp: false
		}
	}

	componentDidMount() {
		this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				this.setState({
					user: firebaseUser
				})
			} else {
				this.setState({
					user: null
				})
			}
		});
	}

	componentWillUnmount() {
		this.authUnregFunc();
	}

	logOut() {
		firebase.auth().signOut();
	}

	render() {
		return (
			<div className="App">
				{this.state.user ?
					<div><h1>{this.state.user.displayName}</h1>
						<button onClick={this.logOut}>Log Out</button>
					</div> :
					<div>
						<UserSignUp></UserSignUp>
						<UserSignIn></UserSignIn>
					</div>
				}
			</div>
		);
	}

}

export default App;
