import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {
    LoginButton,
    AccessToken
} from 'react-native-fbsdk';

import firebase, { firebaseAuth } from './firebase';
const { FacebookAuthProvider } = firebase.auth;

import { Actions } from 'react-native-router-flux';

import backgroundImage from '../img/login-background.png';

export default class LoginView extends Component {

    state = {
        credential: null
    }

    componentWillMount() {
        this.FbAuth();
    }

    FbAuth = () => {

        AccessToken.getCurrentAccessToken().then((data) => {

            const { accessToken } = data;
            const credential = FacebookAuthProvider.credential(accessToken);

            firebaseAuth.signInWithCredential(credential).then((userCredential) => {
                    Actions.home();

                }, (error) => {
                    this.setState({ credential: error });
                }
            );
        });
    }

    handleFBLoginFinished = (error, result) => {
        if (error) {
            alert("Error en el login: " + result.error);
        } else if (result.isCancelled) {
            alert("El login fue cancelado");
        } else {
            this.FbAuth();
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Image style={styles.background} source={ backgroundImage } />
                    <Text style={styles.welcome}>Bienvenido a PlatziMusic!</Text>
                    <LoginButton
                        readPermissions={['public_profile', 'email']}
                        onLoginFinished={ this.handleFBLoginFinished }
                        onLogoutFinished={() => alert("logout")}/>

                    <Text style={styles.welcome}>{this.state.credential && this.state.credential.displayName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 30
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}
);
