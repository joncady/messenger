import React, { Component } from 'react';

/**
 * 
 */

class Structure extends Component {

    render() {
        const { reciever, profilePicture, lastMessage, time } = this.props;

        return(
            <div style={{ display: 'flex'}}>
                <img src={profilePicture} style={{width: '50px', height: '50px', borderRadius: '50%'}}></img>
                
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