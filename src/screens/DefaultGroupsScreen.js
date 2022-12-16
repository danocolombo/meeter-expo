import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as queries from '../jerichoQL/queries';
import { API } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { Surface, useTheme, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/groups/Default.Group.Card';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { printObject } from '../utils/helpers';
import Navigation from '../navigation/Navigation';

const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const { meeter, defaultGroups } = useSysContext();
    const { userProfile } = useUserContext();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getDefaultGroups().then(() => {
            console.log('DONE');
        });
    }, []);
    async function getDefaultGroups() {
        try {
            const systemInfo = await API.graphql({
                query: queries.getOrganizationDefaultGroups,
                variables: { id: userProfile.activeOrg.id },
            });
            printObject('DGS:27-->systemInfo response:\n', systemInfo);
            const defaultGroups =
                systemInfo.data.getOrganization.defaultGroups.items;
            setGroups(defaultGroups);
        } catch (error) {
            printObject('DGS:30-->systemInfo TryCatch failure:\n', error);
            return;
        }
    }
    const handleNewRequest = () => {
        navigation.navigate('DGModal');
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
                    onPress={() => handleNewRequest()}
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
