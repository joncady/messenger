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



let chatList = [{
	reciever: "sonic the hedgehog",
	profilePicture: "https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png",
	lastMessage: "*notices bulge* owo .... whats this? ",
	time: "4200000"
},
{
	reciever: "sonic the hedgehog",
	profilePicture: "https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png",
	lastMessage: "*notices bulge* owo .... whats this? ",
	time: "4200000"
}];

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			user: null,
			signUp: false,
			chats: chatList
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
		var db = firebase.firestore();
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

		let user = "KQw0dyz2ZsjzGAhF8BKM";

		db.collection("conversations").where("users", "array-contains", user).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let chat = {
					reciever: this.getRecipients(doc.data().users, user),
					profilePicture: doc.data().image,
					lastMessage: "hey nerd",
					time: "201230120"
				};

				let newChats = this.state.chats.concat(chat);
				this.setState({ chats: newChats });
				console.log(this.state.chats);
			});
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