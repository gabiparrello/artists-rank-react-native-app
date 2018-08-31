import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

import {
    AccessToken
} from 'react-native-fbsdk';

import { firebaseDataBase, firebaseAuth } from "./firebase";
import firebase from './firebase'
const { FacebookAuthProvider } = firebase.auth;

import ArtistBox from './ArtistBox';
import CommentsList from "./CommentsList";

export default class ArtistDetailView extends Component {

    state = {
        text: "",
        userName: "",
        comments: []
    }

    componentWillMount() {

        this.getArtistCommentsListRef().on('child_added', this.addComment);
    }

    componentWillUnmount() {
        this.getArtistCommentsListRef().off('child_added', this.addComment);
    }

    addComment = (data) => {
        const { id } = this.props.artist;
        const { userName, userPhoto, text } = data.val();

        this.setState({
            comments: this.state.comments.concat({
                userName,
                userPhoto,
                text
            })
        });
    }

    getArtistCommentsRef = () => {

        const { id } = this.props.artist;
        return firebaseDataBase.ref('comments/' + id);
    }

    getArtistCommentsListRef = () => {

        const { id } = this.props.artist;
        return firebaseDataBase.ref('comments/' + id + '/commentsList');
    }

    sendComment = () => {



        const { text } = this.state;
        const { uid, photoURL, displayName } = firebaseAuth.currentUser;
        const artistCommentListRef = this.getArtistCommentsListRef()

        let newArtistCommentListRef = artistCommentListRef.push();

        newArtistCommentListRef.set({
            uid,
            userName: displayName,
            //userPhoto: photoURL,
            text
        });

        this.getArtistCommentsRef().once('value', (snapshot) => {
            const comment = snapshot.val();

            this.getArtistCommentsRef().set({
                commentsCount: comment.commentsCount ? ++comment.commentsCount : 1,
                commentsList: comment.commentsList
            });
        })



        this.setState({ text: '' });
    };

    render() {

        const { artist } = this.props;
        const { comments } = this.state;

        return (
                <View style={styles.container}>
                    <ArtistBox artist={artist} />
                    <View style={styles.commentsListContainer}>
                        <CommentsList comments={comments}/>
                    </View>
                    <View style={styles.commentContainer}>
                        <TextInput
                            style={styles.commentTextInput}
                            placeholder="Deja un comentario..."
                            value={this.state.text}
                            onChangeText={(text) => this.setState({text})}
                            ref={input => { this.textInput = input }}
                        />
                        <Button onPress={() => this.sendComment()}
                                title="Enviar"
                                style={styles.sendCommentBtn}
                        />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create(
    Platform.select({

        ios: {
            container: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'lightgray',
            },
            header: {
                height: 80,
                flexDirection: 'row',
                backgroundColor: '#F8F8F8',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderBottomColor: '#BBB',
                borderBottomWidth: 1,
            },
            appTitle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#212121',
                marginBottom: 10
            },
            moreIcon: {
                marginRight: 15
            },
            commentsListContainer: {
                backgroundColor: '#FFF',
                marginVertical: 5,
                flex: 1,
                paddingVertical: 10,
            },
            commentContainer: {
                backgroundColor: '#FFF',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            commentTextInput: {
                height: 50,
                flex: 1
            },
            sendCommentBtn: {
                width: 120,
                height: 50,
            }
        },
        android: {
            container: {
                flex: 1,
                backgroundColor: 'lightgray',
            },
            header: {
                height: 58,
                flexDirection: 'row',
                backgroundColor: '#00BCD4',
                padding: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: '#00ACC1',
                borderBottomWidth: 1,
                elevation: 8,
            },
            appTitle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#FFF'
            },
            commentsListContainer: {
                backgroundColor: '#FFF',
                marginVertical: 5,
                flex: 1,
                elevation: 4,
                paddingVertical: 10,
            },
            commentContainer: {
                height: 50,
                backgroundColor: '#FFF',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                elevation: 4,
            },
            commentTextInput: {
                height: 50,
                flex: 1
            },
            sendCommentBtn: {
                width: 120,
                height: 50,
            }
        }
    })
);
