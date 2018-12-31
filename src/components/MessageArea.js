import React, { Component } from 'react';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

export default class MessageArea extends Component {

    render() {
        const conversationID = this.props.conversationID;
        return (
            conversationID ? 
            <section>
                <MessageList conversationID={this.props.conversationID}></MessageList>
                <SendMessage conversationID={this.props.conversationID}></SendMessage>
            </section>
            :
            <div>No conversation!</div>
        )
    }

}