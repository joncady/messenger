import React, { Component } from 'react';
import SingleChat from './SingleChat.js';

/**
 * Chatslist displays a list of individual chats, based on chronological order by default
 */

class Structure extends Component {

    render() {
        const chats = this.props.chats;
        return(
            <div>
                {chats.map((chat, index) => {
				    return <SingleChat key={"chat number " + index}  id={chat.id} reciever={chat.reciever} profilePicture ={chat.profilePicture} lastMessage={chat.lastMessage} changeConvo={this.props.changeConvo} time={chat.time}></SingleChat>
                }) 
                }
            </div>
        );
    }


}

export default Structure;