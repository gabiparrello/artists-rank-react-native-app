import React, { Component } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import { navigation } from 'react-native-navigation';

export default class ConfigView extends Component {

    render() {

        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({

            container: {
                flex: 1,
                backgroundColor: 'yellow',
            },
});