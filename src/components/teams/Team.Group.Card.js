import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme, withTheme, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import MeetingCardDate from './ui/Meeting.Card.Date';
import DateBall from '../ui/DateBall';
import DateStack from '../ui/DateStack';
import { printObject } from '../../utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const TeamGroupListCard = ({ team, active, handleDelete }) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    //printObject('mtrTheme:', mtrTheme);
    function groupPressHandler() {
        return;
    }
    function handleDeleteClick() {
        return;
    }
    printObject('team:\n', team);
    return (
        <>
            <View style={styles.rootContainer}>
                <View>
                    <Text>{team.id}</Text>
                </View>
            </View>
        </>
    );
};

export default withTheme(TeamGroupListCard);

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 10,
    },
    meetingItem: {
        marginVertical: 5,
        paddingBottom: 5,
        backgroundColor: 'darkgrey',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'yellow',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    firstRow: {
        flexDirection: 'row',
    },
    dateWrapper: {
        margin: 5,
    },
    // dataWrapper: {
    //     flexDirection: 'column',
    // },
    col1: {
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    eventDateWrapper: {
        // paddingTop: 5,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },

    eventTimeWrapper: {
        marginTop: 5,
        marginBottom: 5,
        // paddingHorizontal: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    eventTime: {
        // marginLeft: 5,
        // marginRight: 30,
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
    },
    registeredWrapper: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: 'green',
        alignItems: 'center',
    },
    registeredText: { color: 'white', fontSize: 10 },
    col2: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    locationWrapper: {
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    locationText: {
        width: '100%',
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostWrapper: {
        paddingLeft: 25,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    hostName: {
        // marginLeft: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-start',
    },
});
