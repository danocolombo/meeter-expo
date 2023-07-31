import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import { Text, View } from 'react-native';
import DefaultGroupForm from '../groups/DefaultGroupForm';
import { useNavigation } from '@react-navigation/native';
import { API } from 'aws-amplify';
import * as mutations from '../../jerichoQL/mutations';
import {
    createDefaultGroup,
    updateDefaultGroup,
} from '../../features/groups/groupsThunks';
import {
    createAWSUniqueID,
    getUniqueId,
    printObject,
} from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
export default function DGModalScreen(props) {
    const group = props.route.params;
    const userProfile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const navigation = useNavigation();

    const handleUpdate = (values) => {
        // printObject('DGM:56-->values:\n', values);
        const groupDef = {
            organizationDefaultGroupsId: userProfile.activeOrg.id,
        };
        const inputGroup = { ...values, ...groupDef };
        if (values.id === null) {
            dispatch(createDefaultGroup({ group: inputGroup }));
            navigation.goBack();
        } else {
            dispatch(updateDefaultGroup({ group: inputGroup }));
            navigation.goBack();
        }
    };
    const handleCancel = () => {
        navigation.goBack();
    };
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={mtrTheme.screenTitle}>Default Group</Text>
                </View>
                <DefaultGroupForm
                    group={group}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                />
            </Surface>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
