import React, { Component } from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class StartChat extends Component {

    constructor() {
        super();
        this.state = {
            user: ''
        }
    }

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    add = () => {
        if (this.state.user !== "") {
            let db = firebase.firestore();
            db.collection("users").where("username", "==", this.state.user)
                .get().then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        console.log("user does not exist");
                    } else {
                        let userID;
                        querySnapshot.forEach((doc) => {
                            userID = doc.id
                        });
                        db.collection("conversations").add({
                            users: [firebase.auth().currentUser.uid, userID],
                            image: "pic.jpg"
                        }).then(() => {
                            this.setState({
                                user: ""
                            });
                            console.log("chat added!");
                        });
                    }
                })
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="user">Start a Chat!</Label>
                    <Input value={this.state.user} onChange={(event) => this.updateValue("user", event.target.value)} type="user" name="user" id="user" placeholder="Enter your friend's user name!" />
                    <Button onClick={this.add}>Add</Button>
                </FormGroup>
            </Form>
        );
    }

}