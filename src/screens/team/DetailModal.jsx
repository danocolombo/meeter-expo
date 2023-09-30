import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, Surface, FAB } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { Storage } from 'aws-amplify';
import { printObject } from '../../utils/helpers';
const DetailModal = ({ detailedMember, onClick }) => {
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system.meeter);
    const [cameraImage, setCameraImage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const profilePicture = useRef(null);
    useEffect(() => {
        let picRef;

        if (detailedMember.picture) {
            picRef = detailedMember.picture;
        } else {
            //picRef = meeter.defaultProfilePicture;
            picRef = meeter.defaultProfilePicture;
        }
        console.log('picRef:', picRef);
        Storage.get(picRef, {
            level: 'public',
        }).then((hardPic) => {
            setProfilePic(hardPic);
            // printObject('PF:132-->Storage.get', hardPic);
            profilePicture.current = hardPic;
        });
    }, []);

    return (
        <View style={mtrStyles(mtrTheme).modal}>
            <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                <Surface style={mtrStyles(mtrTheme).modalSurface}>
                    <Text style={mtrStyles(mtrTheme).modalMemberName}>
                        {detailedMember?.firstName} {detailedMember?.lastName}
                    </Text>
                    <View style={mtrStyles(mtrTheme).modalDataWrapper}>
                        {detailedMember?.picture && (
                            <View style={mtrStyles(mtrTheme).modalRow}>
                                <View
                                    style={mtrStyles(mtrTheme).modalRowCenter}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .profileImageFrame
                                        }
                                    >
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .profileImageWrapper
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: cameraImage
                                                        ? cameraImage
                                                        : profilePic,
                                                }}
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .profileImage
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalColumnHalf}>
                                <Text
                                    style={
                                        mtrStyles(mtrTheme).modalDetailsLabel
                                    }
                                >
                                    Username:
                                </Text>
                            </View>
                            <View style={mtrStyles(mtrTheme).modalColumnHalf}>
                                <Text>{detailedMember?.username}</Text>
                            </View>
                        </View>

                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme)
                                                .modalDetailsLabel
                                        }
                                    >
                                        Phone:
                                    </Text>

                                    <Text>{detailedMember?.phone}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme)
                                                .modalDetailsLabel
                                        }
                                    >
                                        Email:
                                    </Text>

                                    <Text>{detailedMember?.email}</Text>
                                </View>
                            </View>
                        </View>
                        {detailedMember.location && (
                            <>
                                <View
                                    style={mtrStyles(mtrTheme).addressContainer}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).modalRowCenter
                                        }
                                    >
                                        <View
                                            style={mtrStyles(mtrTheme).modalRow}
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalDetailsLabel
                                                }
                                            >
                                                Address
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).modalRowCenter
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalSmallText
                                            }
                                        >
                                            {detailedMember?.location?.street}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).modalRowCenter
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalSmallText
                                            }
                                        >
                                            {detailedMember?.location?.city}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).modalRowCenter
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalSmallText
                                            }
                                        >
                                            {
                                                detailedMember?.location
                                                    ?.stateProv
                                            }
                                            ,{' '}
                                            {
                                                detailedMember?.location
                                                    ?.postalCode
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme)
                                                .modalDetailsLabel
                                        }
                                    >
                                        Birthday:
                                    </Text>

                                    <Text>{detailedMember?.birthday}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View style={mtrStyles(mtrTheme).modalRow}>
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme)
                                                .modalDetailsLabel
                                        }
                                    >
                                        Shirt:
                                    </Text>

                                    <Text>{detailedMember?.shirt}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={mtrStyles(mtrTheme).modalRow}>
                        <View style={mtrStyles(mtrTheme).modalRowCenter}>
                            <Text style={mtrStyles(mtrTheme).modalSmallText}>
                                sub: {detailedMember?.sub}
                            </Text>
                        </View>
                    </View>

                    <View style={mtrStyles(mtrTheme).modalRow}>
                        <View style={mtrStyles(mtrTheme).modalRowCenter}>
                            <Text style={mtrStyles(mtrTheme).modalSmallText}>
                                id: {detailedMember?.id}
                            </Text>
                        </View>
                    </View>

                    <View style={mtrStyles(mtrTheme).buttonContainer}>
                        <View style={mtrStyles(mtrTheme).buttonWrapper}>
                            <CustomButton
                                text='OK'
                                bgColor={mtrTheme.colors.mediumGreen}
                                fgColor={mtrTheme.colors.lightText}
                                onPress={() => onClick(false)}
                            />
                        </View>
                    </View>
                </Surface>
            </View>
        </View>
    );
};

export default DetailModal;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        modal: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mtrTheme.colors.background,
        },
        modalDataWrapper: {
            // marginHorizontal: 20,
            // flex: 1,
            // borderColor: 'blue',
            // borderWidth: 1,
        },
        modalMemberName: {
            fontFamily: 'NanumGothic-ExtraBold',
            fontSize: 24,
            color: mtrTheme.colors.background,
            textAlign: 'center',
            marginVertical: 5,
            paddingTop: 0,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            marginTop: 15,
            width: '100%',
        },
        modalSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            width: '90%',
            borderRadius: 10,
            padding: 20,
        },
        modalRow: {
            flexDirection: 'row',
        },
        modalRowCenter: {
            flex: 1,
            alignItems: 'center',
        },
        modalColumnHalf: {
            flex: 0.5,
        },
        modalSmallText: {
            fontFamily: 'NanumGothic-Regular',
            fontSize: 12,
        },
        modalDetailsLabel: {
            fontFamily: 'NanumGothic-Bold',
            textAlign: 'right',
            paddingRight: 2,
        },
        modalDetailsData: {
            fontFamily: 'NanumGothic-Regular',
            textAlign: 'left',
            paddingRight: 2,
        },
        profileImageFrame: {
            borderWidth: 1,
            borderColor: 'lightgrey',
            backgroundColor: mtrTheme.colors.background,
            padding: 3,
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
        },
        profileImageWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        profileImage: {
            height: 80,
            aspectRatio: 1,
            borderRadius: 40,
        },
        addressContainer: {
            marginTop: 5,
        },
    });
