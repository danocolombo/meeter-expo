import axios from 'axios';
import { printObject } from '../utils/helpers';

const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function deleteMeetingGroups(meetingId) {
    let obj = {
        operation: 'deleteMeetingGroups',
        payload: {
            Key: {
                meetingId: meetingId,
            },
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';

    let results = await axios.post(api2use, body, config);
    // printObject('res:', res);
    return results;
}

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
    //printObject('M37:res:', res);
    if (res?.data?.status === '200') {
        const results = res.data.body;

        return results;
    } else {
        return [];
    }
}
export async function upsertGroupToDDB(group) {
    // this takes the group and puts it in the database. Whether it
    // is insert or update, uses the same API
    let obj = {
        operation: 'updateGroup',
        payload: {
            Item: group,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';
    let res = await axios.post(api2use, body, config);

    return res;
}
export async function deleteGroupFromDDB(groupId) {
    //console.log('G:32-->deleteGroup DB called');
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
    //printObject('G:60-->res', res);

    return res;
}
