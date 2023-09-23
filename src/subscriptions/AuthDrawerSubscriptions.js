import { API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { onCreateMeeting } from '../graphql/subscriptions';
import { onDeleteMeeting } from '../jerichoQL/subscriptions';
import {
    subscriptionCreateMeeting,
    subscriptionDeleteMeeting,
} from '../features/meetings/meetingsThunks';

import { printObject } from '../utils/helpers';

// Define a list to store active subscriptions
const activeSubscriptions = [];

export function setupSubscriptions(dispatch, activeOrgId) {
    // Setup the meeting subscription
    const meetingCreateSubscription = API.graphql(
        graphqlOperation(onCreateMeeting)
    ).subscribe({
        next: (data) => {
            const meeting = data.value.data.onCreateMeeting;
            dispatch(
                subscriptionCreateMeeting({
                    meeting: meeting,
                    activeOrgId: activeOrgId,
                })
            )
                .then((results) => {
                    printObject('AD:25-->meeting added:\n', results);
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('AD:29-->error:\n', error);
                });
        },
        error: (error) => {
            console.error(
                'ADS:34-->onCreateMeeting Subscription error:',
                error
            );
        },
    });
    const meetingDeleteSubscription = API.graphql(
        graphqlOperation(onDeleteMeeting)
    ).subscribe({
        next: (data) => {
            printObject('ADS:46-->data:\n', data);
            const meeting = data.value.data.onDeleteMeeting;
            dispatch(
                subscriptionDeleteMeeting({
                    id: meeting.id,
                })
            )
                .then((results) => {
                    printObject('AD:51-->meeting deleted:\n', results);
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('AD:54-->error:\n', error);
                });
        },
        error: (error) => {
            console.error('ADS:60-->meetingDeleteSubscription  error:', error);
        },
    });
    activeSubscriptions.push(meetingDeleteSubscription);
}

export function unsubscribeAll() {
    // Unsubscribe from all active subscriptions
    activeSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });

    // Clear the list of active subscriptions
    activeSubscriptions.length = 0;
}
