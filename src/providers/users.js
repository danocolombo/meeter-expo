import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function updateProfile(profile) {
    try {
        // const updatedUser = await API.graphql({
        //     query: mutations.updateUserProfile,
        //     variables: { input: userData },
        // });
        const updatedUser = await API.graphql({
            query: mutations.updateUser,
            variables: { input: userData },
        });
        combinedProfile = { ...userProfile, updatedUser };
    } catch (error) {
        printObject('UC:58-->ERROR updateUserProfile:\n', error);
    }
}

export async function updateProfileDDB(profile) {
    let obj = {
        operation: 'updateUser',
        payload: {
            Item: profile,
        },
    };
    let body = JSON.stringify(obj);

    let api2use = process.env.AWS_API_ENDPOINT + '/users';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.Item;
    return returnValue;
}

export async function getProfile(uid) {
    let obj = {
        operation: 'getUser',
        payload: {
            userId: uid,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                let profile = res.data.body.Items[0];
                returnValue.userProfile = profile;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profile found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getProfile:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:61';
        errorReturn.error = err;
        return errorReturn;
    }
}
//
export async function getAffiliateProfiles(affiliate) {
    // console.log('getAffiliateProfiles for ', affiliate);
    let obj = {
        operation: 'getAffiliateUsers',
        payload: {
            affiliate: affiliate,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                returnValue.profiles = res.data.body.Items;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profiles found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getAffiliateProfiles:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:100';
        errorReturn.error = err;
        return errorReturn;
    }
}
export async function getAllProfiles() {
    let obj = {
        operation: 'getAllUsers',
        payload: {},
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                returnValue.profiles = res.data.body.Items;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profiles found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getProfile:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:61';
        errorReturn.error = err;
        return errorReturn;
    }
}
