import React, { Component } from 'react';
import Message from './Message';
import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            oldConversationID: null
        };
    }

    componentDidMount() {
        this.setState({
            oldConversationID: this.props.conversationID
        });
        this.updateChats();
    }

    componentDidUpdate() {
        if (this.state.oldConversationID !== this.props.conversationID) {
            this.updateChats();
        }
    }

    updateChats = () => {    
        let db = firebase.firestore();
        const auth = firebase.auth();

        const conversationID = this.props.conversationID;
        db.collection("messages").where("conversationID", "==", conversationID).orderBy("time")
            .onSnapshot((querySnapshot) => {
                var messages = [];
                querySnapshot.forEach(function (doc) {
                    if (!doc.metadata.hasPendingWrites) {
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
                    }
                    console.log(messages);
                });
                this.setState({ messages: messages, oldConversationID: conversationID });
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
