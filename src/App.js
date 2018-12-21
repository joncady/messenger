import React, { Component } from 'react';
import Structure from './Structure';
import ChatsList from './components/ChatsList.js';

class App extends Component {

	render() {
		// reciever, profilePicture, lastMessage, time
		let chats = [{
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
		}
	];


		return (
			<div className="App">
				<ChatsList chats={chats}></ChatsList>
			</div>
		);
	}

}

export default App;
