import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme, Surface } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { printObject } from '../../utils/helpers';
const DetailModal = ({ detailedMember, onClick }) => {
    const mtrTheme = useTheme();
    return (
        <View style={mtrStyles(mtrTheme).modal}>
            <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                <Surface style={mtrStyles(mtrTheme).modalSurface}>
                    <View style={mtrStyles(mtrTheme).modalDataWrapper}>
                        <Text style={mtrStyles(mtrTheme).modalMemberName}>
                            {detailedMember?.firstName}{' '}
                            {detailedMember?.lastName}
                        </Text>
                    </View>
                    <View style={mtrStyles(mtrTheme).modalDataWrapper}>
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View
                                    style={{
                                        backgroundColor: 'grey',
                                        height: 80,
                                        width: 80,
                                        borderRadius: 40,
                                    }}
                                ></View>
                            </View>
                        </View>
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
                        <View
                            style={[
                                mtrStyles(mtrTheme).modalRow,
                                {
                                    borderWidth: 1,
                                    borderColor: 'green',
                                },
                            ]}
                        >
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <View style={mtrStyles(mtrTheme).modalRow}>
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
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <Text
                                    style={mtrStyles(mtrTheme).modalSmallText}
                                >
                                    {detailedMember?.location?.street}
                                </Text>
                            </View>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <Text
                                    style={mtrStyles(mtrTheme).modalSmallText}
                                >
                                    {detailedMember?.location?.city}
                                </Text>
                            </View>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalRow}>
                            <View style={mtrStyles(mtrTheme).modalRowCenter}>
                                <Text
                                    style={mtrStyles(mtrTheme).modalSmallText}
                                >
                                    {detailedMember?.location?.stateProv},{' '}
                                    {detailedMember?.location?.postalCode}
                                </Text>
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
                        {detailedMember?.affiliations
                            ? detailedMember.affiliations.map((a) => (
                                  <View style={mtrStyles(mtrTheme).modalRow}>
                                      <View
                                          style={
                                              mtrStyles(mtrTheme).modalRowCenter
                                          }
                                      >
                                          <View
                                              style={
                                                  mtrStyles(mtrTheme).modalRow
                                              }
                                          >
                                              <Text
                                                  style={
                                                      mtrStyles(mtrTheme)
                                                          .modalDetailsLabel
                                                  }
                                              >
                                                  Organization:
                                              </Text>

                                              <Text>{a?.role}</Text>
                                          </View>
                                      </View>
                                  </View>
                              ))
                            : null}
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

                    <View style={mtrStyles(mtrTheme).noteContainer}>
                        <Text style={mtrStyles(mtrTheme).noteText}>
                            NOTE: All groups for the meeting will be deleted as
                            well.
                        </Text>
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
            borderColor: 'blue',
            borderWidth: 1,
        },
        modalMemberName: {
            fontFamily: 'NanumGothic-ExtraBold',
            fontSize: 24,
            color: mtrTheme.colors.background,
            textAlign: 'center',
            paddingTop: 0,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            marginTop: 15,
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
    });
