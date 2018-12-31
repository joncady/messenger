import React, { Component } from 'react';
import UserSignUp from './components/UserSignUp';
import UserSignIn from "./components/UserSignIn";
import firebase from 'firebase/app';
import 'firebase/auth';
import ChatsList from './components/ChatsList.js';
import "firebase/firestore";
import MessageArea from './components/MessageArea';
import { Row, Col } from 'reactstrap';
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

	componentWillUnmount() {
		this.authUnregFunc();
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
		// // Disable deprecated features
		db.settings({
			timestampsInSnapshots: true
		});

		this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				let user = firebaseUser.uid
				let conversations = []
				db.collection("conversations").where("users", "array-contains", user).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						let chat = {
							reciever: this.getRecipients(doc.data().users, user),
							profilePicture: doc.data().image,
							lastMessage: "hey nerd",
							time: "201230120",
							id: doc.id
						}; //TODO: fetch the most recent message from this conversation
						conversations.push(chat);
						// let newChats = this.state.chats.concat(chat);
						// this.setState({ chats: newChats });
						// console.log(this.state.chats);
					});
					this.setState({ chats: conversations, user: firebaseUser, loading: false });
				});
			} else {
				this.setState({
					user: null,
					loading: false
				});
			}
		});
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
					<div style={{ textAlign: "center", padding: "4rem"}}>
						<img alt="loading symbol" src={require("./assets/loader.gif")}></img>
					</div>
					:
					this.state.user ?
						<div>
							<h1>{this.state.user.displayName}</h1>
							<button onClick={this.logOut}>Log Out</button>
							<Row>
								<Col>
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