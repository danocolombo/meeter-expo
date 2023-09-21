import { API, graphqlOperation } from 'aws-amplify';
import { onCreateMeeting, onGroupSubscription } from '../graphql/subscriptions';
import { addSubscriptionMeeting } from '../features/meetings/meetingsThunks';

import { printObject } from '../utils/helpers';

// Define a list to store active subscriptions
const activeSubscriptions = [];

export function setupSubscriptions(dispatch) {
    // Setup the meeting subscription
    const meetingSubscription = API.graphql(
        graphqlOperation(onCreateMeeting)
    ).subscribe({
        next: (data) => {
            const meeting = data.value.data.onCreateMeeting;
            // printObject('ADS:15-->onCreateMeeting subscription:\n', meeting);
            dispatch(addSubscriptionMeeting(meeting))
                .then((results) => {
                    printObject('AD:44-->meeting added:\n', results);
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('AD:48-->error:\n', error);
                });
            // Dispatch a Redux action or update state as needed
        },
        error: (error) => {
            console.error(
                'ADS:20-->onCreateMeeting Subscription error:',
                error
            );
        },
    });

    // Setup the group subscription
    // const groupSubscription = API.graphql(
    //     graphqlOperation(onGroupSubscription)
    // ).subscribe({
    //     next: (data) => {
    //         const groupData = data.value.data.onGroupSubscription;
    //         console.log('New group data:', groupData);
    //         // Dispatch a Redux action or update state as needed
    //     },
    //     error: (error) => {
    //         console.error('Group Subscription error:', error);
    //     },
    // });

    // Add the subscriptions to the list of active subscriptions
    // activeSubscriptions.push(meetingSubscription, groupSubscription);
    activeSubscriptions.push(meetingSubscription);
}

export function unsubscribeAll() {
    // Unsubscribe from all active subscriptions
    activeSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });

    // Clear the list of active subscriptions
    activeSubscriptions.length = 0;
}
