import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
type PermissionType = {
    manage: boolean,
    meals: boolean,
    groups: boolean,
};
function Permissions({ permissions, editFlag, togglePermission }) {
    const [manageIsChecked, setManageIsChecked] = useState(permissions.manage);
    const [mealsIsChecked, setMealsIsChecked] = useState(permissions.meals);
    const [groupsIsChecked, setGroupsIsChecked] = useState(permissions.groups);

    const changeManagerRole = () => {
        if (editFlag == true) {
            togglePermission('manager');
            setManageIsChecked(!manageIsChecked);
        }
    };
    const changeGroupsRole = () => {
        if (editFlag === true) {
            togglePermission('groups');
            setGroupsIsChecked(!groupsIsChecked);
        }
    };
    const changeMealsRole = () => {
        if (editFlag === true) {
            togglePermission('meals');
            setMealsIsChecked(!mealsIsChecked);
        }
    };
    return (
        <View
            style={[
                styles.item,
                { backgroundColor: editFlag ? 'yellow' : '#f9c2ff' },
            ]}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                    <View>
                        <Text style={{ paddingHorizontal: 2 }}>Manage</Text>
                    </View>
                    <View>
                        <Checkbox
                            style={styles.checkbox}
                            value={manageIsChecked}
                            onValueChange={changeManagerRole}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center', padding: 2 }}>
                    <View>
                        <Text style={{ paddingHorizontal: 2 }}>Meals</Text>
                    </View>
                    <View>
                        <Checkbox
                            style={styles.checkbox}
                            value={mealsIsChecked}
                            onValueChange={changeMealsRole}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center', padding: 2 }}>
                    <View>
                        <Text style={{ paddingHorizontal: 2 }}>Groups</Text>
                    </View>
                    <View>
                        <Checkbox
                            style={styles.checkbox}
                            value={groupsIsChecked}
                            onValueChange={changeGroupsRole}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
export default Permissions;
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 2,
        // marginVertical: 8,
        // marginHorizontal: 16
    },
    checkbox: {
        margin: 1,
    },
    title: {
        fontSize: 20,
    },
});
