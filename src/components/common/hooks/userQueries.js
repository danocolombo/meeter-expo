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
async function OriginalFetchMeeting(meetingId) {
    let obj = {
        operation: 'getMeetingById',
        payload: {
            meetingId: '4cf80233e3bc4900df96e1b21d6fdc10',
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    //printObject('DATA:', data);
    return data;
}
async function FetchProfile(clientId) {
    var client = clientId.toLowerCase();
    var d = new Date();
    let yesterday = getDateMinusDays(d, 1);
    let twoMonthsAgo = getDateMinusDays(d, 120);

    let obj = {
        operation: 'getUser',
        payload: {
            userId: clientId,
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/user';
    const { data } = await axios.post(api2use, body, config);
    return data;
}

export { FetchProfile };
