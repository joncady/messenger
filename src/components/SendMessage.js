import React, { Component } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

export default class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }
    updateValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    sendMessage = () =>  {
        const auth = firebase.auth();
        //let time = Date.now();
        // content, time, picture, src, sender, user
        let message = {
            content: this.state.content,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            hasImage: false,
            src: "",
            user: auth.currentUser.uid,
            conversationID: this.props.conversationID
        };
        this.db.collection("messages").doc().set(message)
            .then(() => {this.updateValue("content", "")});

    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.updateValue("content", event.target.value)} value = {this.state.content}></input>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }

    componentDidMount = () => {
        this.db = firebase.firestore();
    }
}