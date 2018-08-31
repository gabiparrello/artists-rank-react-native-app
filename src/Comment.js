import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    //Image,
    ActivityIndicator
} from 'react-native';

import Image from 'react-native-image-progress';

import progressCircle from 'react-native-progress/Circle';

//const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMy1mW0uwn8Y1Dx-SNxKTvn5w3AAsp0UIKE-qR0j_x6j-v7gPO';
const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/pivo-659e3.appspot.com/o/The%20Rooftop%2Fimg%2FCaptura%20de%20pantalla%202018-05-01%20a%20la(s)%2022.21.02.png?alt=media&token=2581a779-bd94-4048-ac9b-0e16d03664c9';

const Comment = (props) => {

    return (
    <View style={styles.commentContainer}>
        <Image imageStyle={styles.image}
               style={styles.image}
               source={
                    props.comment.userPhoto ?
                        { uri: props.comment.userPhoto } :
                        { uri: defaultImage }
                }
               indicator={Platform.OS === 'ios' ? progressCircle : ActivityIndicator}
        />
        <View style={styles.commentTextContainer}>
            <Text style={styles.commentTitle}>{props.comment.userName}</Text>
            <Text style={styles.commentMsg}>{props.comment.text}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#ecf0f1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentTextContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 25,
    },
    commentTitle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        marginBottom: 7
    },
    commentMsg: {

    }
})

export default Comment;