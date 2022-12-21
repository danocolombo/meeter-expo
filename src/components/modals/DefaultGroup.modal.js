import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import { Text, View } from 'react-native';
import DefaultGroupForm from '../groups/DefaultGroupForm';
import { useNavigation } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
export default function DGModalScreen(props) {
    const group = props.route.params;
    printObject('group:', group);
    const mtrTheme = useTheme();
    const navigation = useNavigation();

    const meeting = {
        meetingId: '1',
        title: 'test',
    };
    const handleUpdate = () => {
        console.log('click received');
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
