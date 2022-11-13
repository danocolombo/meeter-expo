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

    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    const { data } = await axios.post(api2use, body, config);
    return data;
}
async function UpdateProfile(values) {
    let obj = {
        operation: 'updateUser',
        payload: {
            Item: values,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    const { data } = await axios.post(api2use, body, config);
    return data;
}

export { FetchProfile, UpdateProfile };
