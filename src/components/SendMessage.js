import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { Picker, Emoji } from 'emoji-mart';
import 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default class SendMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            showEmojis: false
        }
    }

    componentDidMount = () => {
        this.db = firebase.firestore();
    }

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    sendMessage = () => {
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
            .then(() => { this.updateValue("content", "") });
    }

    addEmoji = (emoji) => {
        this.setState({
            content: this.state.content + emoji.native
        })
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Input onChange={(event) => this.updateValue("content", event.target.value)} value={this.state.content} placeholder="Type your message here..."></Input>
                <Emoji emoji='smiley' set="google" size={32} onClick={() => this.setState({ showEmojis: !this.state.showEmojis })} />
                {this.state.showEmojis && <div id="emoji-container">
                    <div id="emoji-hover">
                        <Picker set='google' onSelect={this.addEmoji} />
                    </div>
                </div>
                }
                <div>
                    <Button onClick={this.sendMessage}>Send</Button>
                </div>
            </div>
        );
    }

}