import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class UserSignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            displayName: '',
            errorMessage: null
        }
    }

    signUp = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((firebaseUser) => {
                let id = firebaseUser.user.uid;
                let data = {
                    region: "", city: '', bio: "", displayName: this.state.displayName, twitter: '', discord: '', main: '', secondary: '',
                    friendCode: '', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
                }
                let userRef = firebase.database().ref("userData").child(`${id}`);
                userRef.set({ data: data })
                firebase.auth().currentUser.updateProfile({
                    displayName: this.state.displayName,
                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
                }).then(() => {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                    window.location.hash = "#/profile";
                });
            }).catch((err) => this.setState({ errorMessage: err.message }));
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
                            <Label for="displayName">Tag</Label>
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