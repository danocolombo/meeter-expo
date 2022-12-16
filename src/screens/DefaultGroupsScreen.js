import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, useTheme, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/Default.Group.Card';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { printObject } from '../utils/helpers';

const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const { meeter, defaultGroups } = useSysContext();
    const { userProfile } = useUserContext();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        setGroups(defaultGroups);
    }, []);

    const handleNewRequest = () => {
        Alert.alert('NEW REQUEST');
        //navigation.navigate('MeetingNew');
    };
    printObject('DGS:49-->groups:\n', groups);
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
            {groups && (
                <>
                    {groups && (
                        <FlatList
                            data={groups}
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
