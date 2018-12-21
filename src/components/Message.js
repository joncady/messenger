import React, { Component } from 'react';

class Message extends Component {

    render() {
        const { content, time, picture, src, sender, user } = this.props;
        let localString = (new Date(time * 1000)).toLocaleString();
        // let localTime = (new Date(time * 1000)).toLocaleTimeString();
        return (
            <div>
                {picture &&
                <div id="photo-area">
                    <img src={src} width="200" alt="Message"></img>
                </div>}
                {!sender && <h1>{user}</h1>}
                <h3>{localString}</h3>
                <p>{content}</p>
            </div>
        );
    }

}

export default Message;