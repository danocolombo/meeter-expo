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
async function FetchMeeting(meetingId) {
    let obj = {
        operation: 'getMeetingById',
        payload: {
            meetingId: meetingId,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    //printObject('DATA:', data);
    return data;
}
async function FetchActiveMeetings(clientId) {
    var client = clientId.toLowerCase();
    var d = new Date();
    const yr = parseInt(d.getFullYear());
    let mo = parseInt(d.getMonth());
    const da = parseInt(d.getDate());
    const hr = parseInt(d.getHours());
    const mi = parseInt(d.getMinutes());
    //month and day lengths if applicable
    mo = mo + 1;
    const moFix = ('0' + mo.toString()).slice(-2);
    const daFix = ('0' + da.toString()).slice(-2);
    const today = yr.toString() + '-' + moFix + '-' + daFix;

    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: client,
            date: today,
            direction: 'ASC',
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function FetchHistoricMeetings(clientId) {
    var client = clientId.toLowerCase();
    var d = new Date();
    let yesterday = getDateMinusDays(d, 1);
    let twoMonthsAgo = getDateMinusDays(d, 120);

    let obj = {
        operation: 'getMeetingsBetweenDates',
        payload: {
            clientId: client,
            startDate: twoMonthsAgo,
            stopDate: yesterday,
            direction: 'DESC',
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function PutMeeting(values) {
    let obj = {
        operation: 'putMeeting',
        payload: {
            Item: values,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
export { FetchMeeting, FetchActiveMeetings, FetchHistoricMeetings, PutMeeting };
