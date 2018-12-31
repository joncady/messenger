import React, { Component } from 'react';
import Message from './Message';
import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null
        };
    }

    componentDidMount = () => {
        let db = firebase.firestore();
        const auth = firebase.auth();

        const conversationID = this.props.conversationID;
        // db.collection("messages").where("conversationID", "==", conversationID).get()
        //     .then((querySnapshot) => {
        // 	querySnapshot.forEach((doc) => {
        //         // content, time, picture, src, sender, user
        //         let data = doc.data();
        //         console.log(data);
        //         let sender = data.user === auth.currentUser.uid;
        //         let message = {
        //             content: data.content,
        //             time: data.time.seconds,
        //             hasImage: data.hasImage,
        //             src: data.src,
        //             sender: sender,
        //             user: data.user
        //         }
        //         console.log(message);
        //         messages.push(message);
        // 		// let newChats = this.state.chats.concat(chat);
        // 		// this.setState({ chats: newChats });
        // 		// console.log(this.state.chats);
        //     });
        //     this.setState({messages: messages});
        // });

        var messages = [];
        console.log(conversationID);
        db.collection("messages").where("conversationID", "==", conversationID)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    //messages.push(doc.data());
                    let data = doc.data();
                    console.log(data);
                    let sender = data.user === auth.currentUser.uid;
                    let message = {
                        content: data.content,
                        time: data.time.seconds,
                        hasImage: data.hasImage,
                        src: data.src,
                        sender: sender,
                        user: data.user
                    }
                    console.log(message);
                    messages.push(message);
                });
                console.log(messages);
                this.setState({ messages: messages });
                //this.updateValue("messages", messages);
            });

    }

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const messages = this.state.messages;
        return (
            <div id="message-area">
                {messages &&
                    messages.map((message, index) => {
                        return <Message key={"message" + index} content={message.content} time={message.time} hasImage={message.hasImage} src={message.src} sender={message.sender} user={message.user}></Message>
                    })
                }
            </div>
        )
    }
}
