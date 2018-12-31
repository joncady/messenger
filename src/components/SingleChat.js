import React, { Component } from 'react';

/**
 * 
 */

class Structure extends Component {

    render() {
        const { reciever, profilePicture, lastMessage, time, id } = this.props;
        return(
            <div onClick={() => this.props.changeConvo(id)} style={{ display: 'flex'}}>
                <img alt="Chat" src={profilePicture} style={{width: '50px', height: '50px', borderRadius: '50%'}}></img>
                <div>
                    <h6>{reciever}</h6>
                    <p>{lastMessage}</p>
                </div>

                <div>
                    <p>{time}</p>
                </div>
            </div>
        );
    }


}

export default Structure;