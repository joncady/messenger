import React, {  Component } from 'react';
import UserSignUp from './components/UserSignUp';
import UserSignIn from "./components/UserSignIn";
import firebase from 'firebase/app';
import 'firebase/auth';
import ChatsList from './components/ChatsList.js';
import "firebase/firestore";
import MessageArea from './components/MessageArea';
import { Row, Col } from 'reactstrap';

// Initialize Cloud Firestore through Firebase

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			user: null,
			signUp: false,
			chats: []
		}
	}

	componentWillUnmount() {
		this.authUnregFunc();
	}

	logOut() {
		firebase.auth().signOut();
	}

	// add temp data to
	// var ref = db.collection("conversations");

	// ref.doc().set({
	// 	image: "hi.jpg",
	// 	users: ["KQw0dyz2ZsjzGAhF8BKM", "TMimSglHAAc9POJMVjTX"] });
	// ref.doc().set({
	// 	image: "hello.jpg",
	// 	users: ["TMimSglHAAc9POJMVjTX", "fakeuser222"] });

	getRecipients(list, user) {
		let res = "";
		for (let i = 0; i < list.length; i++) {
			if (list[i] !== user) {
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
				this.setState({
					user: firebaseUser
				})
			} else {
				this.setState({
					user: null
				});
			}
		});
		// edit this later 
		let user = "KQw0dyz2ZsjzGAhF8BKM";

		let conversations = []
		db.collection("conversations").where("users", "array-contains", user).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let chat = {
					reciever: this.getRecipients(doc.data().users, user),
					profilePicture: doc.data().image,
					lastMessage: "hey nerd",
					time: "201230120"
				}; //TODO: fetch the most recent message from this conversation
				conversations.push(chat);
				// let newChats = this.state.chats.concat(chat);
				// this.setState({ chats: newChats });
				// console.log(this.state.chats);
			});
			this.setState({ chats: conversations});
		});
	}

	render() {
		return (
			<div className="App">
				{this.state.user ?
					<div>
						<h1>{this.state.user.displayName}</h1>
						<button onClick={this.logOut}>Log Out</button>
						<Row>
							<Col>
								<ChatsList chats={this.state.chats}></ChatsList>
							</Col>
							<Col>
								<MessageArea></MessageArea>
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