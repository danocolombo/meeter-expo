import { API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
// import {  } from '../graphql/subscriptions';
import {
    onDeleteMeeting,
    onUpdateMeeting,
    onCreateMeeting,
    onCreateGroup,
    onUpdateGroup,
    onDeleteGroup,
} from '../jerichoQL/subscriptions';
import {
    subscriptionCreateGroup,
    subscriptionDeleteGroup,
    subscriptionUpdateGroup,
} from '../features/meetings/meetingsThunks';
import {
    addANewMeeting,
    deleteAMeeting,
    updateAMeeting,
} from '../features/meetings/meetingsSlice';
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
            if (meeting?.organizationMeetingsId === activeOrgId) {
                delete meeting?.createdAt;
                delete meeting?.updatedAt;
                delete meeting?.__typename;
                delete meeting?.groups?.nextToken;
                delete meeting?.groups?.__typename;
                dispatch(addANewMeeting(meeting));
            }
            return;
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
            try {
                const meeting = data?.value?.data?.onUpdateMeeting;
                if (meeting?.organizationMeetingsId === activeOrgId) {
                    //need to clean up object before sending to slice
                    dispatch(updateAMeeting(meeting));
                } else {
                    console.log('ADS:81-->updateMeeting not ours');
                }
            } catch (error) {
                printObject(
                    'ADS:80-->error dispatching subscriptionUpdateMeeting:\n',
                    error
                );
            }
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
            try {
                // printObject('ADS:85-->SUB received data:\n', data);
                const meeting = data.value.data.onDeleteMeeting;
                console.log('deleteAMeeting:', meeting.id);
                dispatch(
                    deleteAMeeting({
                        id: meeting.id,
                    })
                );
                console.log('meetingDeleteSubscription successful');
            } catch (error) {
                console.log('meetingDeleteSubscription failed');
            }
        },
        error: (error) => {
            console.error('ADS:66-->meetingDeleteSubscription  error:', error);
        },
    });
    const groupCreateSubscription = API.graphql(
        graphqlOperation(onCreateGroup)
    ).subscribe({
        next: (data) => {
            const group = data?.value?.data?.onCreateGroup;
            if (group?.organizationGroupsId === activeOrgId) {
                // console.log('beforeDispatch');
                dispatch(subscriptionCreateGroup(group))
                    .then((results) => {
                        //
                        console.log('new group added successfully');
                    })
                    .catch((error) => {
                        console.log(
                            'error from subscriptionCreateGroup dispatch'
                        );
                        printObject('ADS:118-->error:\n', error);
                    });
            } else {
                console.log('ADS:121-->subscriptionCreateGroup not ours');
            }
            return;
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
            if (
                group?.__typename === 'Group' &&
                group?.organizationGroupsId === activeOrgId
            ) {
                //need to clean up object before sending to slice
                dispatch(subscriptionUpdateGroup(group))
                    .then((results) => {
                        console.log('groupUpdated');
                    })
                    .catch((error) => {
                        console.log('error from subscriptionUpdateGroup');
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
            //* ========================================
            // subscription deletes will only provide the
            // __type and the id. So we cannot check the
            // org. send the delete request to thunk and
            // it will be parsed.
            //* ========================================
            const group = data?.value?.data?.onDeleteGroup;
            if (group?.__typename === 'Group') {
                dispatch(subscriptionDeleteGroup({ groupId: group.id }))
                    .then((results) => {
                        //
                        console.log('group deleted successfully');
                    })
                    .catch((error) => {
                        console.log(
                            'error from subscriptionDeleteGroup dispatch'
                        );
                        printObject('ADS:203-->error:\n', error);
                    });
            } else {
                console.log('ADS:206-->subscriptionDeleteGroup not ours');
            }
            return;
        },
        error: (error) => {
            console.error('ADS:211-->subscriptionDeleteGroup  error:', error);
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
