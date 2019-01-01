import React, { Component } from 'react';
import SingleChat from './SingleChat.js';
import { ListGroup } from 'reactstrap';

/**
 * Chatslist displays a list of individual chats, based on chronological order by default
 */

export default class ChatsList extends Component {

    render() {
        const chats = this.props.chats;
        return (
            <div id="chatlist-area">
                <ListGroup>
                    {chats.map((chat, index) => {
                        return <SingleChat key={"chat number " + index} chat={chat} changeConvo={this.props.changeConvo}></SingleChat>
                    })
                    }
                </ListGroup>
            </div>
        );
    }

}