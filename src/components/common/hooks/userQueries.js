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

async function FetchProfile(userId) {
    let obj = {
        operation: 'fetchUser',
        payload: {
            userId: userId,
        },
    };
    console.log(obj);
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function PutProfile(values) {
    let obj = {
        operation: 'putProfile',
        payload: {
            Item: values,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    const { data } = await axios.post(api2use, body, config);
    return data;
}

export { FetchProfile, PutProfile };
