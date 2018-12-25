import React, { Component } from 'react';
import Message from './Message';

class MessageArea extends Component {

    render() {
        //const messages = this.props.messages;
        let messages = [{
			content: "hello",
			time: "1545704040",
			picture: true,
			src: "https://www.gstatic.com/images/branding/product/2x/photos_96dp.png",
			sender: true,
			user: "Jon"
		},
		{
			content: "hello",
			time: "1545704040",
			picture: true,
			src: "https://www.gstatic.com/images/branding/product/2x/photos_96dp.png",
			sender: false,
			user: "Jon"
        }];
        return (
            <section>
                <div id="message-area">
                    {messages.map((message, index) => {
                        return <Message key={"message" + index} content={message.content} time={message.time} picture={message.picture} src={message.src} sender={message.sender} user={message.user}></Message>
                    })}
                </div>
            </section>
        )
    }

}

export default MessageArea;