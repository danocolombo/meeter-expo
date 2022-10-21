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
