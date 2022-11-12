import axios from 'axios';
import { printObject } from '../utils/helpers';

const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function getGroupsForMeeting(meetingId) {
    let obj = {
        operation: 'getGroupsByMeetingId',
        payload: {
            meetingId: meetingId,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';

    let res = await axios.post(api2use, body, config);
    // printObject('res:', res);
    if (res?.data?.status === '200') {
        const results = res.data.body;

        return results;
    } else {
        return [];
    }
}

export async function deleteGroupFromDDB(groupId) {
    console.log('G:32-->deleteGroup DB called');
    let obj = {
        operation: 'deleteGroup',
        payload: {
            Key: {
                groupId: groupId,
            },
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';
    let res = await axios.post(api2use, body, config);
    if (res.status === 200) {
        console.log('G:45-->deleteGroup DB call successful');
        return true;
    } else {
        console.log('G:48-->deleteGroup DB call failed');
        return false;
    }
    return results;
}
