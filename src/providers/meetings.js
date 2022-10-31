import axios from 'axios';
import { updateAffiliateActiveAndReference } from '../features/usersSlice';
import { printObject, getDateMinusDays } from '../utils/helpers';
import { getAffiliate } from './system';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

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
    console.log('M:74-->deleteMeeting DB call successful');
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
    if (res.status === 200) {
        console.log('M:87-->deleteMeeting DB call successful');
        return true;
    } else {
        console.log('M:90-->deleteMeeting DB call failed');
        return false;
    }
    return results;
}
