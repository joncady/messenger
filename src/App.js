import React, { Component } from 'react';
import UserSignUp from './components/UserSignUp';
import UserSignIn from "./components/UserSignIn";
import firebase from 'firebase/app';
import 'firebase/auth';
import ChatsList from './components/ChatsList.js';
import "firebase/firestore";
import MessageArea from './components/MessageArea';
import { Row, Col, Button } from 'reactstrap';
import StartChat from './components/StartChat';

// Initialize Cloud Firestore through Firebase

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			user: null,
			signUp: false,
			loading: true,
			chats: [],
			conversationID: null
		}
	}

	logOut() {
		firebase.auth().signOut();
	}

	getRecipients(list, user) {
		let res = "";
		for (let i = 0; i < list.length; i++) {
			if (list[i] !== user) {
				console.log(list[i])
				res += list[i] + " ";
			}
		}
		return res.trim();
	}

	componentDidMount() {
		let db = firebase.firestore();
		// Disable deprecated features
		db.settings({
			timestampsInSnapshots: true
		});

		this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				let user = firebaseUser.uid;
				let conversations = [];
				// TODO: update to realtime snapshots from database
				db.collection("conversations").where("users", "array-contains", user).onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
					conversations = [];
					querySnapshot.forEach((doc) => {
						if(!doc.metadata.hasPendingWrites) {
							let chat = {
								receiver: this.getRecipients(doc.data().users, user),
								profilePicture: doc.data().image,
								id: doc.id
							};
							conversations.push(chat);
						}
						this.setState({ chats: conversations});
					});
					console.log(conversations);
					this.setState({user: firebaseUser, loading: false });
				});
				
			} else {
				this.setState({
					user: null,
					loading: false
				});
			}
		});
	}

	componentWillUnmount() {
		this.authUnregFunc();
	}

	changeConversation = (convoID) => {
		this.setState({
			conversationID: convoID
		});
	}

	render() {
		return (
			<div className="App">
				{this.state.loading ?
					<div style={{ textAlign: "center", padding: "4rem" }}>
						<img alt="loading symbol" src={require("./assets/loader.gif")}></img>
					</div>
					:
					this.state.user ?
						<div>
							<Row className="mx-0">
								<Col xs="4">
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<h1>{this.state.user.displayName}</h1>
										<div>
											<Button onClick={this.logOut}>Log Out</Button>
										</div>
									</div>
									<StartChat></StartChat>
									<ChatsList chats={this.state.chats} changeConvo={this.changeConversation}></ChatsList>
								</Col>
								<Col>
									<MessageArea conversationID={this.state.conversationID}></MessageArea>
								</Col>
							</Row>
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