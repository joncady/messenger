import React, { Component } from 'react';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

export default class MessageArea extends Component {

    render() {
        const conversationID = this.props.conversationID;
        return (
            conversationID ?
                <section id="message-area">
                    <div className="text-center p-2">
                        <h1>{this.props.conversationID}</h1>
                    </div>
                    <MessageList conversationID={this.props.conversationID}></MessageList>
                    <SendMessage conversationID={this.props.conversationID}></SendMessage>
                </section>
                :
                <div>No conversation selected!</div>
        )
    }

}