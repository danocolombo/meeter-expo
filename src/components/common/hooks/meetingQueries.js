import axios from 'axios';
import { printObject } from '../../../utils/helpers';

async function FetchMeeting() {
    const config = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    let obj = {
        operation: 'getMeetingById',
        payload: {
            meetingId: '9c9e330328ee5ebd0ffd4091d5fee38e',
        },
    };
    let body = JSON.stringify(obj);
    const api2use =
        'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meetings';
    const { data } = await axios.post(api2use, body, config);
    //printObject('DATA:', data);
    return data;
}
async function FetchActiveMeetings() {
    const config = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: 'wbc',
            date: '2022-11-04',
            direction: 'ASC',
        },
    };
    let body = JSON.stringify(obj);
    const api2use =
        'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function FetchHistoricMeetings() {
    const config = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    let obj = {
        operation: 'getMeetingsBetweenDates',
        payload: {
            clientId: 'wbc',
            startDate: '2022-09-03',
            stopDate: '2022-11-03',
            direction: 'DESC',
        },
    };
    let body = JSON.stringify(obj);
    const api2use =
        'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
export { FetchMeeting, FetchActiveMeetings, FetchHistoricMeetings };
