/*
 *      ANDROID BUILD SOLUTION
 *
 *      __ERROR: sdk location not found
 *
 *       export ANDROID_HOME=/Users/GabiParrello/Library/Android/sdk/
 *       export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
 *       export PATH=$PATH:~/android-sdks/platform-tools/
 *       export PATH=$PATH:~/android-sdks/tools/
 *
 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Picker,
} from 'react-native';

import * as Progress from 'react-native-progress';

import ArtistList from "./ArtistList";
import Icon from 'react-native-vector-icons/Ionicons'
import { getArtists } from "./api-client";

export default class HomeView extends Component {

    state = {
        artists: null
    }

    componentDidMount() {
        getArtists()
            .then(data => this.setState({ artists: data }))
    }

    render() {

        const artists = this.state.artists;

        return artists ?
                    (
                        <View>
                            <View style={styles.header}>
                                { Platform.OS === 'ios' && <View style={{width: 30}}/> }
                                <Text style={styles.appTitle}>Top 50 Artistas Argentina</Text>
                                <Icon style={styles.moreIcon} name={Platform.select({ios: "ios-more-outline", android: "md-more"})} size={35} color={Platform.select({ios: "#444", android: "#FFF"})}/>
                            </View>
                            <ArtistList artists={artists} />
                        </View>
                    ) :
                    Platform.OS === 'ios' ?
                        <Progress.Circle size={70} indeterminate={true} style={styles.activityIndicator} /> :
                        <ActivityIndicator size='large' style={styles.activityIndicator} />
    }
}

const styles = StyleSheet.create(
    Platform.select({

        ios: {
            container: {
                flex: 1,
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
            activityIndicator: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
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
                paddingLeft: 25,
                paddingRight: 25,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: '#00ACC1',
                borderBottomWidth: 1,
                elevation: 8,
            },
            appTitle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#FFF'
            },
            activityIndicator: {
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: 0,
                marginTop: 'auto',
                marginBottom: 'auto',
                top: 0,
                bottom: 0,
            }
        }
    })
);
