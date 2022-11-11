import axios from 'axios';
import {
    printObject,
    getDateMinusDays,
    getToday,
} from '../../../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

async function FetchGroups(meetingId) {
    let obj = {
        operation: 'getGroupsByMeetingId',
        payload: {
            meetingId: meetingId,
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function FetchGroup(groupId) {
    let obj = {
        operation: 'getGroupById',
        payload: {
            groupId: groupId,
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function PutGroup(values) {
    let obj = {
        operation: 'addGroup',
        payload: {
            Item: values,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/groups';
    const { data } = await axios.post(api2use, body, config);
    return data;
}

export { FetchGroup, FetchGroups, PutGroup };
