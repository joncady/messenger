import React, { Component } from 'react';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

export default class MessageArea extends Component {

    render() {
        //const messages = this.props.messages;
        return (
            <section>
                <MessageList conversationID={"Qk3ucCeCYffduB6QFhxJ"}></MessageList>
                <SendMessage></SendMessage>
            </section>
        )
    }

}