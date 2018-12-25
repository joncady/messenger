import React, { Component } from 'react';
import Structure from './Structure';
import ChatsList from './components/ChatsList.js';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// API KEY 
var config = {
    apiKey: "AIzaSyDgp5nbxCzaKf9FPyLuwyuzewVbwmV83t8",
    authDomain: "messenger-f94f2.firebaseapp.com",
    databaseURL: "https://messenger-f94f2.firebaseio.com",
    projectId: "messenger-f94f2",
    storageBucket: "messenger-f94f2.appspot.com",
    messagingSenderId: "292856931571"
  };
  firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});  

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

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chats: chatList
		};
		//this.setState({chats: chatList});
		// reciever, profilePicture, lastMessage, time


		// add temp data to
		// var ref = db.collection("conversations");

		// ref.doc().set({
		// 	image: "hi.jpg",
		// 	users: ["KQw0dyz2ZsjzGAhF8BKM", "TMimSglHAAc9POJMVjTX"] });
		// ref.doc().set({
		// 	image: "hello.jpg",
		// 	users: ["TMimSglHAAc9POJMVjTX", "fakeuser222"] });
	}

	getRecipients(list, user) {
		let res = "";
		for(let i = 0; i < list.length; i++) {
			if(list[i] !== user) {
				res += list[i] + " ";
			}
		}
		return res.trim();
	}

	render() {
		return (
			<div className="App">
				<ChatsList chats={this.state.chats}></ChatsList>
			</div>
		);
	}

	componentDidMount() {
		let user = "KQw0dyz2ZsjzGAhF8BKM";

		db.collection("conversations").where("users", "array-contains", user).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				//console.log(`${doc.id} => ${doc.data()}`);
				//console.log(doc.data()[0].id);
				//console.log(doc.data());
				let chat = {
					reciever: this.getRecipients(doc.data().users, user),
					profilePicture: doc.data().image,
					lastMessage: "hey nerd",
					time: "201230120"
				};
				
				let newChats = this.state.chats.concat(chat);
				this.setState({chats : newChats});
				console.log(this.state.chats);
			});
		});
	}

}

export default App;
