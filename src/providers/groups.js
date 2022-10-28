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
