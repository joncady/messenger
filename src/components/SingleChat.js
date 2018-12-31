import React, { Component } from 'react';
import "firebase/firestore";
import firebase from 'firebase/app';

/**
 * 
 */

class SingleChat extends Component {
    constructor() {
        super();
        this.state = {
            content: "",
            time: ""
        }
    }

    render() {
        const { reciever, profilePicture, lastMessage, time, id } = this.props;
        return(
            <div onClick={() => this.props.changeConvo(id)} style={{ display: 'flex'}}>
                <img alt="Chat" src={profilePicture} style={{width: '50px', height: '50px', borderRadius: '50%'}}></img>
                <div>
                    <h6>{reciever}</h6>
                    <p>{this.state.content}</p>
                </div>

                <div>
                    <p>{this.state.time}</p>
                </div>
            </div>
        );
    }

    componentDidMount = () => {

        let conversationID = this.props.id;

        let db = firebase.firestore();
		// // Disable deprecated features
		db.settings({
			timestampsInSnapshots: true
        });
        
        // query for last message
        db.collection("messages").where("conversationID", "==", conversationID).orderBy("time", "desc")
        .limit(1)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((response) => {
                if(!response.metadata.hasPendingWrites) {
                    let content = response.data().content;
                    let time = response.data().time.seconds;
                    console.log(content + " " + time);
                    this.setState({
                        content: content,
                        time: (new Date(time * 1000)).toLocaleString()
                    });
                }
            });
        });
    }


}

export default SingleChat;