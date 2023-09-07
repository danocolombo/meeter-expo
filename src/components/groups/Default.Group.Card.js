import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const DefaultGroupListCard = ({ group, active, handleDelete }) => {
    const navigation = useNavigation();
    let iconToDisplay;
    switch (group?.gender) {
        case 'f':
            iconToDisplay = 'human-female';
            break;
        case 'm':
            iconToDisplay = 'human-male';
            break;
        default:
            iconToDisplay = 'human-male-female';
            break;
    }
    const mtrTheme = useTheme();
    //printObject('mtrTheme:', mtrTheme);
    function groupPressHandler() {
        navigation.navigate('DGModal', {
            id: group.id,
            gender: group.gender,
            title: group.title,
            location: group.location,
            facilitator: group.facilitator,
        });
    }
    function handleDeleteClick() {
        handleDelete(group.id);
    }
    return (
        <>
            <View style={mtrStyles(mtrTheme).rootContainer}>
                <Pressable
                    onPress={groupPressHandler}
                    style={({ pressed }) =>
                        pressed && mtrStyles(mtrTheme).pressed
                    }
                >
                    <View
                        style={[
                            mtrStyles(mtrTheme).meetingItem,

                            active
                                ? mtrStyles(mtrTheme).meetingCardActivePrimary
                                : mtrStyles(mtrTheme)
                                      .meetingCardHistoricPrimary,
                        ]}
                    >
                        <View style={mtrStyles(mtrTheme).wrapper}>
                            <View
                                style={mtrStyles(mtrTheme).genderIconContainer}
                            >
                                <MaterialCommunityIcons
                                    name={iconToDisplay}
                                    size={50}
                                    color={mtrTheme.colors.darkGraphic}
                                />
                            </View>

                            <View style={mtrStyles(mtrTheme).column2}>
                                <View style={mtrStyles(mtrTheme).textWrapper}>
                                    <Text style={mtrStyles(mtrTheme).titleText}>
                                        {group.title.trim()}
                                    </Text>

                                    <Text
                                        style={mtrStyles(mtrTheme).locationText}
                                    >
                                        {group.location.trim()}
                                    </Text>

                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .facilitatorText
                                            }
                                        >
                                            {group.facilitator.trim()}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={mtrStyles(mtrTheme).trashIconWrapper}
                                >
                                    <TouchableOpacity
                                        onPress={() => handleDeleteClick()}
                                    >
                                        <View>
                                            <MaterialCommunityIcons
                                                name='trash-can-outline'
                                                size={30}
                                                color={mtrTheme.colors.critical}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default DefaultGroupListCard;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        rootContainer: {
            marginHorizontal: 20,
        },
        pressed: {
            opacity: 0.75,
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
        meetingCardActivePrimary: {
            backgroundColor: mtrTheme.colors.backgroundAlternate1,
        },
        meetingCardHistoricPrimary: {
            backgroundColor: mtrTheme.colors.background,
        },
        wrapper: {
            flexDirection: 'row',
            paddingVertical: 5,
        },
        genderIconContainer: {
            marginTop: 20,
            paddingHorizontal: 5,
        },

        trashIconWrapper: {
            justifyContent: 'center',
            paddingRight: 15,
        },
        column2: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
        },
        textWrapper: {
            width: '85%',
        },
        titleText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
            paddingLeft: 0,
            letterSpacing: 0.5,
        },
        locationText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
            paddingLeft: 0,
            textAlign: 'left',
            letterSpacing: 0.5,
        },
        facilitatorText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
            paddingLeft: 0,
            letterSpacing: 0.5,
        },
    });
