// subscriptionHandlers.js
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateMeetingForOrg } from '../../jerichoQL/subscriptions';
import { addSubscribeMeeting } from './meetingsSlice'; // Adjust the import path

export const subscribeToMeetingCreation = (orgId, dispatch) => {
    const subscription = API.graphql(
        graphqlOperation(onCreateMeetingForOrg, { orgId })
    );

    subscription.subscribe({
        next: (event) => {
            const newMeetingForOrg = event.value.data.onCreateMeetingForOrg;
            dispatch(addSubscribeMeeting(newMeetingForOrg));
        },
        error: (error) => {
            console.error('Subscription error:', error);
        },
    });

    // Return the subscription to be used for unsubscribing
    return subscription;
};

export const unsubscribeFromMeetingCreation = (subscription) => async () => {
    subscription.unsubscribe(); // Unsubscribe from the subscription
};
