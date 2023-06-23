import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { printObject } from '../../utils/helpers';

function Permissions({ permissions, editFlag, togglePermission }) {
    const [manageIsChecked, setManageIsChecked] = useState(permissions?.manage);
    const [mealsIsChecked, setMealsIsChecked] = useState(permissions?.meals);
    const [groupsIsChecked, setGroupsIsChecked] = useState(permissions?.groups);

    useFocusEffect(
        useCallback(() => {
            setManageIsChecked(permissions?.manage);
            setGroupsIsChecked(permissions?.groups);
            setMealsIsChecked(permissions?.meals);
        }, [permissions])
    );
    const changeManagerRole = (checkboxValue) => {
        if (editFlag == true) {
            console.log('P:25-->checkboxValue: ', checkboxValue);
            let returnValue = 'manage.' + (checkboxValue ? 'add' : 'remove');
            togglePermission(returnValue);
            setManageIsChecked(!manageIsChecked);
        }
    };
    const changeGroupsRole = (checkboxValue) => {
        if (editFlag === true) {
            togglePermission('groups');
            setGroupsIsChecked(!groupsIsChecked);
        }
    };
    const changeMealsRole = (checkboxValue) => {
        if (editFlag === true) {
            togglePermission('meals');
            setMealsIsChecked(!mealsIsChecked);
        }
    };
    // printObject('P:41-->permissions:\n', permissions);
    return (
        <View
            style={[
                styles.item,
                { backgroundColor: editFlag ? 'yellow' : '#A1C2F1' },
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
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
    },
});
