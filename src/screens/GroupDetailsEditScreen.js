import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { printObject } from '../utils/helpers';
import GroupForm from '../components/GroupForm';
import { updateGroup } from '../features/meetings/meetingsThunks';
//   FUNCTION START
//   ================
const GroupDetailsEditScreen = ({ route, navigation }) => {
    const group = route.params.group;
    const meeting = route.params.meeting;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.profile);
    const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Cancel',
        });
    }, [navigation, group]);

    const handleUpdate = (values) => {
        const valueRequest = {
            group: values,
            orgId: user.activeOrg.id,
        };
        dispatch(updateGroup(valueRequest));
    };

    return (
        <>
            <GroupForm
                group={group}
                meeting={meeting}
                handleUpdate={handleUpdate}
            />
        </>
    );
};
export default GroupDetailsEditScreen;
