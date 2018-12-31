import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class UserSignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            displayName: '',
            name: '',
            errorMessage: null
        }
    }

    signUp = (event) => {
        event.preventDefault();
        if (this.state.displayName.length > 5) {
            let db = firebase.firestore();
            db.collection("users").where("username", "==", this.state.displayName)
                .get().then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                            .then((firebaseUser) => {
                                firebase.auth().currentUser.updateProfile({
                                    displayName: this.state.displayName,
                                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
                                }).then(() => {
                                    db.collection("users").doc(firebase.auth().currentUser.uid).set({
                                        name: this.state.name,
                                        username: this.state.displayName,
                                        profilePic: "..."
                                    });
                                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                                });
                            }).catch((err) => this.setState({ errorMessage: err.message }));
                    } else {
                        this.setState({
                            errorMessage: "This username already exists!"
                        })
                    }
                })
        }

    }

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <div className="text-center mb-4">
                    </div>
                    <Form style={{ width: "50%", marginLeft: 'auto', marginRight: 'auto' }}>
                        <FormGroup>
                            <Label for="displayName">Name</Label>
                            <Input type="displayName" name="displayName" value={this.state.name} onChange={(event) => this.updateValue("name", event.target.value)} id="name" placeholder="Your Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="displayName">Username</Label>
                            <Input type="displayName" name="displayName" value={this.state.displayName} onChange={(event) => this.updateValue("displayName", event.target.value)} id="display-name" placeholder="Your Tag" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" autoComplete="email" value={this.state.email} onChange={(event) => this.updateValue("email", event.target.value)} id="email" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" autoComplete="current-password" value={this.state.password} onChange={(event) => this.updateValue("password", event.target.value)} id="examplePassword" placeholder="Password" />
                        </FormGroup>
                        {this.state.errorMessage && <Alert color="danger">{this.state.errorMessage}</Alert>}
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={(event) => this.signUp(event)} color="primary">Sign Up</Button>
                        </div>
                        <div style={{ textAlign: 'center', padding: '5px', paddingTop: '50px', paddingBottom: '20px' }}>
                            {/* <Link to="/signin">Already have an account? Sign in here.</Link> */}
                        </div>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}

export default UserSignUp