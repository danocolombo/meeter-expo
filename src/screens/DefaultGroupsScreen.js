import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Surface, useTheme, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/Default.Group.Card';
import { useSysContext } from '../contexts/SysContext';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const DefaultGroups = [
    {
        id: '834f0f09-f98d-42e7-a78c-dcca56sje82b',
        gender: 'x',
        title: 'Newcomers',
        location: 'Main',
        facilitator: 'Dick & Jane',
    },
    {
        id: '67e30f09-f98d-42e7-a78c-dcca5j2ld-99a',
        gender: 'f',
        title: 'A-Z',
        location: 'Room 9',
        facilitator: 'Mary',
    },
    {
        id: '9sw12hf09-f98d-42e7-a78c-dcca5f99f317',
        gender: 'f',
        title: 'Grief',
        location: 'Room 1',
        facilitator: 'Suz',
    },
    {
        id: '3i8734f09-f98d-42e7-a78c-dcca88dm3di7',
        gender: 'm',
        title: 'A-Z',
        location: 'Room 3',
        facilitator: 'Jon',
    },
];
const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
    const handleNewRequest = () => {
        Alert.alert('NEW REQUEST');
        //navigation.navigate('MeetingNew');
    };

    return (
        <SafeAreaView
            style={[
                mtrTheme.defaultGroupScreenSafeArea,
                { backgroundColor: mtrTheme.colors.background },
            ]}
        >
            <View>
                <Text style={mtrTheme.screenTitle}>DEFAULT MEETINGS</Text>
            </View>

            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    marginBottom: 10,
                }}
            >
                <Text style={mtrTheme.subTitleSmall}>
                    The following meetings can be dynamically added to meetings.
                </Text>
            </View>
            {DefaultGroups && (
                <>
                    {DefaultGroups && (
                        <FlatList
                            data={DefaultGroups}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <DefaultGroupCard group={item} active={true} />
                            )}
                        />
                    )}
                </>
            )}
            <View style={{ marginHorizontal: 20 }}>
                <CustomButton
                    text='ADD NEW GROUP'
                    bgColor={mtrTheme.colors.success}
                    fgColor='white'
                    type='PRIMARY'
                    enabled='true'
                    onPress={() => {}}
                />
            </View>
        </SafeAreaView>
    );
};

export default DefaultGroupsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});
