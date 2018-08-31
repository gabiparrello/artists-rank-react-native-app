import React, { Component } from 'react';
import {
    FlatList,
    TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux'

import ArtistBox from "./ArtistBox";

export default class ArtistList extends Component {

    handlePress(artist) {
        Actions.ArtistDetail({ artist })
    }

    render() {

        return (
            <FlatList
                data={this.props.artists}
                renderItem={({item}) => {

                    return (
                        <TouchableOpacity onPress={() => this.handlePress(item)}>
                            <ArtistBox artist={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        );
    }
}