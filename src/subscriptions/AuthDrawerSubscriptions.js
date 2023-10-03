import { API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
// import { onCreateMeeting } from '../graphql/subscriptions';
import {
    onDeleteMeeting,
    onUpdateMeeting,
    onCreateMeeting,
    onCreateGroup,
    onDeleteGroup,
    onUpdateGroup,
} from '../jerichoQL/subscriptions';
import {
    subscriptionCreateMeeting,
    subscriptionDeleteMeeting,
    subscriptionUpdateMeeting,
    subscriptionCreateGroup,
    subscriptionDeleteGroup,
    subscriptionUpdateGroup,
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
    const meetingUpdateSubscription = API.graphql(
        graphqlOperation(onUpdateMeeting)
    ).subscribe({
        next: (data) => {
            printObject(
                'ADS:62-->SUB meetingUpdateSubscription received data:\n',
                data
            );
            const meeting = data.value.data.onUpdateMeeting;
            if (meeting.organizationMeetingsId !== activeOrgId) {
                console.log('ADS:67-->meetingUpdateSubscription ignored.');
                return;
            }
            console.log('ADS:70-->meetingUpdateSubscription handled');
            return;
        },
        error: (error) => {
            console.error(
                'ADS:76-->meetingUpdateSubscription Subscription error:',
                error
            );
        },
    });
    const meetingDeleteSubscription = API.graphql(
        graphqlOperation(onDeleteMeeting)
    ).subscribe({
        next: (data) => {
            printObject('ADS:85-->SUB received data:\n', data);
            const meeting = data.value.data.onDeleteMeeting;
            dispatch(
                subscriptionDeleteMeeting({
                    id: meeting.id,
                })
            )
                .then((results) => {
                    printObject(
                        'ADS:94-->subscriptionDeleteMeeting complete:\n',
                        results
                    );
                })
                .catch((error) => {
                    console.log('error from dispatch');
                    printObject('ADS:100-->error:\n', error);
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
            printObject('ADS:111-->current activeOrgId:', activeOrgId);
            printObject(
                'ADS:113-->groupCreateSub...data.value.data.onCreateGroup\n',
                data.value.data.onCreateGroup
            );
            if (data.value.data.onCreateGroup.organization.id !== activeOrgId) {
                console.log('groupCreateSubscription ignored');
                return;
            }
            console.log('groupCreateSubscription handled...');
        },
        error: (error) => {
            console.error('ADS:124-->onCreateGroup Subscription error:', error);
        },
    });
    const groupUpdateSubscription = API.graphql(
        graphqlOperation(onUpdateGroup)
    ).subscribe({
        next: (data) => {
            // printObject('ADS:131-->SUB received data:\n', data);
            const group = data?.value?.data?.onUpdateGroup;
            // console.log('ADS:131-->__typename:', group?.__typename);
            // console.log(
            //     'ADS:132-->organizationGroupsId:',
            //     group?.organizationGroupsId
            // );
            // console.log('ADS:136-->activeOrgId:', activeOrgId);
            if (
                group?.__typename === 'Group' &&
                group?.organizationGroupsId === activeOrgId
            ) {
                //need to clean up object before sending to slice
                console.log('dispatchin..');
                dispatch(subscriptionUpdateGroup(group))
                    .then((results) => {
                        printObject(
                            'ADS:139-->subscriptionUpdateGroup successful:\n',
                            results
                        );
                    })
                    .catch((error) => {
                        console.log('error from dispatch');
                        printObject('ADS:145-->error:\n', error);
                    });
            } else {
                console.log('ADS:155-->updateGroup not ours');
            }
            return;
        },
        error: (error) => {
            console.error('ADS:161-->groupUpdateSubscription  error:', error);
        },
    });
    const groupDeleteSubscription = API.graphql(
        graphqlOperation(onDeleteGroup)
    ).subscribe({
        next: (data) => {
            printObject('ADS:145-->SUB received data:\n', data);
            const group = data?.value?.data?.onDeleteGroup;
            if (!group || group?.organizationGroupsId !== activeOrgId) {
                console.log('ADS:148-->groupDeleteSubscription ignored');
                return;
            }
            console.log('ADS:151-->groupDeleteSubscription handled');
            return;
        },
        error: (error) => {
            console.error('ADS:156-->groupDeleteSubscription  error:', error);
        },
    });
    activeSubscriptions.push(meetingCreateSubscription);
    activeSubscriptions.push(meetingUpdateSubscription);
    activeSubscriptions.push(meetingDeleteSubscription);
    activeSubscriptions.push(groupCreateSubscription);
    activeSubscriptions.push(groupUpdateSubscription);
    activeSubscriptions.push(groupDeleteSubscription);
}

export function unsubscribeAll() {
    // Unsubscribe from all active subscriptions
    activeSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });

    // Clear the list of active subscriptions
    activeSubscriptions.length = 0;
}
