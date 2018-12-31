import React, { Component } from 'react';
import "firebase/firestore";
import firebase from 'firebase/app';
import { ListGroupItem } from 'reactstrap';

/**
 * 
 */

export default class SingleChat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            time: ""
        }
    }

    componentDidMount = () => {

        let conversationID = this.props.chat.id;

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
                    this.setState({
                        content: content,
                        time: (new Date(time * 1000)).toLocaleTimeString()
                    });
                }
            });
        });
    }

    render() {
        const { receiver, profilePicture, id } = this.props.chat;
        return(
            <ListGroupItem onClick={() => this.props.changeConvo(id)} style={{ display: 'flex' }} className="clickable">
                <img alt="Chat" src={profilePicture} style={{width: '50px', height: '50px', borderRadius: '50%'}}></img>
                <div>
                    <h6>{receiver}</h6>
                    <p>{this.state.content}</p>
                </div>

                <div>
                    <p>{this.state.time}</p>
                </div>
            </ListGroupItem>
        );
    }

}