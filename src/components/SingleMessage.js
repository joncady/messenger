import React, { Component } from 'react';

export default class SingleMessage extends Component {

    render() {
        const { content, time, hasImage, src, sender, user } = this.props;
        let localString = (new Date(time * 1000)).toLocaleString();
        return (
            <div className={sender ? "right" : "left"}>
                <div className={sender ? "sent" : "received"}>
                    {hasImage &&
                        <div id="photo-area">
                            <img src={src} width="200" alt="Message"></img>
                        </div>}
                    {!sender && <h3>{user}</h3>}
                    <h4>{localString}</h4>
                    <p>{content}</p>
                </div>
            </div>
        );
    }

}