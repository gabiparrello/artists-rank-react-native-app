import React, { Component } from 'react';
import {
    FlatList,
} from 'react-native';
import Comment from "./Comment";


export default class CommentsList extends Component {

    render() {

        return (
            <FlatList
                data={this.props.comments}
                renderItem={({item}) => {

                    return <Comment comment={item} />;
                }}
            />
        );
    }
}