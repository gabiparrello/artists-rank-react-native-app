
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import { firebaseDataBase, firebaseAuth } from "./firebase";

export default class ArtistBox extends Component {

    state = {
        liked: false,
        likesCount: 0,
        commentsCount: 0,
    }

    componentDidMount() {

        this.getArtistRef().on('value', (snapshot) => {
            const artist = snapshot.val();
            const { uid } = firebaseAuth.currentUser;
            if (artist) {
                this.setState({
                    liked: artist.likes && artist.likes[uid],
                    likesCount: artist.likesCount,
                });
            }
        });

        this.getArtistCommentsCountRef().on('value', (snapshot) => {
            const commentsCount = snapshot.val();
            if (commentsCount) {
                this.setState({
                    commentsCount
                });
            }
        });
    }

    getArtistRef = () => {

        const { id } = this.props.artist;
        return firebaseDataBase.ref('artist/' + id);
    }

    getArtistCommentsCountRef = () => {

        const { id } = this.props.artist;
        return firebaseDataBase.ref('comments/' + id + '/commentsCount');
    }

    toggleLike = () => {

        const { uid } = firebaseAuth.currentUser;

        this.getArtistRef().transaction(function(artist) {
            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likesCount--;
                    artist.likes[uid] = null;
                } else {
                    artist.likesCount++;

                    if (!artist.likes) {
                        artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            return artist || {
                likesCount: 1,
                likes: {
                    [uid]: true
                }
            };
        });
    }

    render() {

        const {image, name, comments, rank} = this.props.artist;
        const { likesCount, commentsCount } = this.state;

        const likeIcon = this.state.liked ?
            <Icon name={Platform.select({ios: "ios-heart", android: "md-heart"})} size={30} color="#d63031" /> :
            <Icon name={Platform.select({ios: "ios-heart-outline", android: "md-heart-outline"})} size={30} color="#BBB" />

        return (
            <View style={styles.artistBox}>
                <Image style={styles.image} source={{ uri: image }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{rank + '. ' + name}</Text>
                    <View style={styles.interactionsContainer}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => this.toggleLike()}>
                                {likeIcon}
                            </TouchableOpacity>
                            <Text style={styles.count}>{likesCount}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name={Platform.select({ios: "ios-chatboxes-outline", android: "md-chatboxes"})} size={30} color="#BBB" />
                            <Text style={styles.count}>{commentsCount}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(

    Platform.select({
        ios: {

            image: {
                width: 150,
                height: 150,
            },
            artistBox: {
                backgroundColor: '#FFF',
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE',
            },
            info: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            },
            name: {
                fontSize: 20,
                marginTop: 10,
                color: '#333',
            },
            interactionsContainer: {
                flexDirection: 'row',
                marginTop: 15,
                marginHorizontal: 30,
            },
            iconContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            count: {
                color: '#666',
            }
        },
        android: {

            image: {
                width: 150,
                height: 150,
            },
            artistBox: {
                backgroundColor: '#FFF',
                flexDirection: 'row',
                margin: 5,
                elevation: 4,
            },
            info: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            },
            name: {
                fontSize: 20,
                marginTop: 10,
                color: '#333',
            },
            interactionsContainer: {
                flexDirection: 'row',
                marginTop: 15,
                marginHorizontal: 30,
            },
            iconContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            count: {
                color: '#666',
            }
        }
    })
);
