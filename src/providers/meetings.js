import axios from 'axios';
import { updateAffiliateActiveAndReference } from '../features/usersSlice';
import { printObject, getDateMinusDays } from '../utils/helpers';
import { getAffiliate } from './system';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function updateMeetingDDB(meeting) {
    console.log('M:12-->meeting:', JSON.stringify(meeting));
    let obj = {
        operation: 'putMeeting',
        payload: {
            Item: meeting,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';

    let res = await axios.post(api2use, body, config);
    printObject('M:23-->res:', res);
    var returnValue = res.data;
    return returnValue;
}
export async function addMeetingDDB(meeting) {
    //      required fields to add new meeting
    //      meetingId, clientId, meetingDate, meetingType, title
    let ts = new Date();
    // printObject('M29:addMeetingDDB:', ts);
    // printObject('M:32-->meeting:\n', meeting);
    // console.log('M:23-->meeting:', JSON.stringify(meeting));
    let obj = {
        operation: 'putMeeting',
        payload: {
            Item: meeting,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    printObject('M:42PUT body:', body);
    let res = await axios.post(api2use, body, config);
    ts = new Date();
    // printObject('M:45:addMeetingDDB:', ts);
    // printObject('M:46-->res:', res);
    var returnValue = res.data;
    return returnValue;
}
export async function getActiveMeetings(affiliate, today) {
    // console.log('affiliate', affiliate);
    // console.log('today', today);
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: affiliate.toLowerCase(),
            date: today,
            direction: 'ASC',
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.body.Items;
    printObject('MEETINGS-back:', returnValue);
    return returnValue;
}
export async function getHistoricMeetings(affiliate, today) {
    var d = new Date();
    let yesterday = getDateMinusDays(d, 1);
    let twoMonthsAgo = getDateMinusDays(d, 120);

    let obj = {
        operation: 'getMeetingsBetweenDates',
        payload: {
            clientId: 'wbc',
            startDate: twoMonthsAgo,
            stopDate: yesterday,
            direction: 'DESC',
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    let res = await axios.post(api2use, body, config);

    const results = res.data.body.Items;

    return results;
}
export async function getSupportedMeetings(affiliate) {
    //   we support 3 months in redux to start with
    var d = new Date();
    let threeMonthsAgo = getDateMinusDays(d, 90);

    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: affiliate.toLowerCase(),
            date: threeMonthsAgo,
            direction: 'DESC',
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    let res = await axios.post(api2use, body, config);

    const results = res.data.body.Items;

    return results;
}
export async function deleteMeetingFromDDB(meetingId) {
    //console.log('M:74-->deleteMeeting DB call successful');
    let obj = {
        operation: 'deleteMeeting',
        payload: {
            Key: {
                meetingId: meetingId,
            },
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    let res = await axios.post(api2use, body, config);
    return res;

    //return results;
}
