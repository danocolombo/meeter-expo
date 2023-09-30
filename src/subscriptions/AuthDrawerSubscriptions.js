import { API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { onCreateMeeting } from '../graphql/subscriptions';
import {
    onDeleteMeeting,
    onCreateGroup,
    onDeleteGroup,
    onUpdateMeeting,
} from '../jerichoQL/subscriptions';
import {
    subscriptionCreateMeeting,
    subscriptionDeleteMeeting,
    subscriptionCreateGroup,
    subscriptionDeleteGroup,
    subscriptionUpdateMeeting,
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
                    printObject(
                        'ADS:25-->subscriptionCreateMeeting successful:\n',
                        results
                    );
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('ADS:36-->error:\n', error);
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
            printObject('ADS:50-->SUB received data:\n', data);
            const meeting = data.value.data.onDeleteMeeting;
            dispatch(
                subscriptionDeleteMeeting({
                    id: meeting.id,
                })
            )
                .then((results) => {
                    printObject(
                        'ADS:58-->subscriptionDeleteMeeting complete:\n',
                        results
                    );
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('ADS:62-->error:\n', error);
                });
        },
        error: (error) => {
            console.error('ADS:66-->meetingDeleteSubscription  error:', error);
        },
    });
    const groupCreateSubscription = API.graphql(
        graphqlOperation(onCreateGroup)
    ).subscribe({
        next: (data) => {
            printObject('ADS:76-->current activeOrgId:', activeOrgId);
            printObject(
                'ADS:77-->groupCreateSub...data.value.data.onCreateGroup\n',
                data.value.data.onCreateGroup
            );
            if (data.value.data.onCreateGroup.organization.id !== activeOrgId) {
                console.log('groupCreateSubscription ignored');
                return;
            }
            console.log('groupCreateSubscription handled...');
            // const meeting = data.value.data.onCreateGroup;
            // dispatch(
            //     subscriptionCreateMeeting({
            //         meeting: meeting,
            //         activeOrgId: activeOrgId,
            //     })
            // )
            //     .then((results) => {
            //         printObject(
            //             'ADS:25-->subscriptionCreateMeeting successful:\n',
            //             results
            //         );
            //     })
            //     .catch((error) => {
            //         console.log('error from dispatch');
            //         printObject('ADS:36-->error:\n', error);
            //     });
        },
        error: (error) => {
            console.error('ADS:98-->onCreateGroup Subscription error:', error);
        },
    });
    const groupDeleteSubscription = API.graphql(
        graphqlOperation(onDeleteGroup)
    ).subscribe({
        next: (data) => {
            printObject('ADS:114-->SUB received data:\n', data);
            const group = data?.value?.data?.onDeleteGroup;
            if (!group || group?.organizationGroupsId !== activeOrgId) {
                console.log('ADS:117-->groupDeleteSubscription ignored');
                return;
            }
            console.log('ADS:120-->groupDeleteSubscription handled');
            return;
            // dispatch(
            //     subscriptionDeleteGroup({
            //         id: group.id,
            //         meetingId: group.meetingGroupsId
            //     })
            // )
            //     .then((results) => {
            //         printObject(
            //             'ADS:124-->subscriptionDeleteGroup complete:\n',
            //             results
            //         );
            //     })
            //     .catch((error) => {
            //         console.log('error from dispatch');
            //         printObject('ADS:130-->error:\n', error);
            //     });
        },
        error: (error) => {
            console.error('ADS:66-->meetingDeleteSubscription  error:', error);
        },
    });
    const meetingUpdateSubscription = API.graphql(
        graphqlOperation(onUpdateMeeting)
    ).subscribe({
        next: (data) => {
            printObject(
                'ADS:152-->SUB meetingUpdateSubscription received data:\n',
                data
            );
            const meeting = data.value.data.onUpdateMeeting;
            if (meeting.organizationMeetingsId !== activeOrgId) {
                console.log('ADS:159-->meetingUpdateSubscription ignored.');
                return;
            }
            console.log('ADS:162-->meetingUpdateSubscription handled');
            return;
            // dispatch(
            //     subscriptionCreateMeeting({
            //         meeting: meeting,
            //         activeOrgId: activeOrgId,
            //     })
            // )
            //     .then((results) => {
            //         printObject(
            //             'ADS:25-->subscriptionCreateMeeting successful:\n',
            //             results
            //         );
            //     })
            //     .catch((error) => {
            //         console.log('error from dispatch');
            //         printObject('ADS:36-->error:\n', error);
            //     });
        },
        error: (error) => {
            console.error(
                'ADS:34-->onCreateMeeting Subscription error:',
                error
            );
        },
    });
    activeSubscriptions.push(meetingDeleteSubscription);
    activeSubscriptions.push(meetingCreateSubscription);
    activeSubscriptions.push(groupCreateSubscription);
    activeSubscriptions.push(meetingUpdateSubscription);
}

export function unsubscribeAll() {
    // Unsubscribe from all active subscriptions
    activeSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });

    // Clear the list of active subscriptions
    activeSubscriptions.length = 0;
}
