import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
} from 'react-native';


import { Scene, Router, Stack } from 'react-native-router-flux';
import HomeView from "./HomeView";
import ArtistDetailView from "./ArtistDetailView";
import LoginView from "./LoginView";

export default class App extends Component {

    render() {

        return (
            <Router>
                <Stack key="root">
                    <Scene key="login" component={LoginView} hideNavBar />
                    <Scene key="home" component={HomeView} hideNavBar />
                    <Scene key="ArtistDetail" component={ArtistDetailView} title="Comentarios" style={styles.navBar}  />
                </Stack>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#00BCD4',
    }
});

/*import { Navigation } from 'react-native-navigation';
//import Icon from 'react-native-vector-icons/Ionicons';

import HomeView from "./HomeView";
import ConfigView from "./ConfigView"


export default () => {
    Navigation.registerComponent('PIVO.HomeView', () => HomeView);
    Navigation.registerComponent('PIVO.ConfigView', () => ConfigView);

    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'One',
                screen: 'PIVO.HomeView', // this is a registered name for a screen
                //icon: Icon.getImageSource('md-star', 20, 'gray'),
                //selectedIcon: Icon.getImageSource('md-star', 20, 'blue'), // iOS only
                title: 'TopArtists'
            },
            {
                label: 'Two',
                screen: 'PIVO.ConfigView',
                //icon: Icon.getImageSource('ios-cog-outline', 20, 'gray'),
                //selectedIcon: Icon.getImageSource('ios-cog', 20, 'blue'), // iOS only
                title: 'Configs'
            }
        ]
    });
}*/