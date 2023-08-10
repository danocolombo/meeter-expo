import { DefaultTheme } from 'react-native-paper';
const primaryBackground = '#293462';
const secondaryColor = '#1CD6CE';
const primaryColor = '#CAEBF2';
const accentColor = '#FEDB39';
const activityIndicator = '#293462';
const alternateColor = '#D61C4E';
const errorTextBox = '#ff9999';
const historyTileColor = '#fff';
const darkColor = '#000';
const lightColor = '#fff';
const darkText = '#000';
const lightText = '#fff';
const mediumText = '#999';

const theme = {
    ...DefaultTheme,
    // Specify custom property
    ourCustomPropertyKey: true,
    //whether this is dark theme or not
    dark: true,
    // color mode used for dark theme  ('adaptive' | 'exact')
    mode: 'exact',
    // roundness of common elements
    roundness: 50,
    // Specify custom property in nested object
    colors: {
        // primary color for your app, usually your brand color
        primary: primaryColor,
        // secondary color for your app which complements the primary color
        secondary: secondaryColor,
        accent: accentColor,
        secondaryText: '#eee',
        //background color for pages, such as lists
        background: primaryBackground,
        backgroundMedium: '#999',
        backgroundLight: '#eee',
        // background color for elements containing content, such as cards
        surface: primaryBackground,
        lightShadow: '#cccccc',
        mediumShadow: '#8c8c8c',
        darkShadow: '#1a6985',
        text: '#eee',
        activityIndicator: activityIndicator,
        //color for the disabled elements
        disabled: '#cccccc',
        //color for placeholder text, such as input placeholder
        placeholder: 'lightgrey',
        // color for backdrops of various components such as modals
        backdrop: '#eee',
        //background color for snackbars
        onSurface: 'yellow',
        // background color for badges
        landingAppName: '#FEDB39',
        success: 'green',
        warning: 'yellow',
        critical: '#D61C4E',
        errorTextBox: errorTextBox,
        notification: 'red',
        navActive: '#D61C4E',
        navInactive: '#8c8c8c',
        darkText: darkText,
        black: '#000',
        lightText: lightText,
        mediumText: mediumText,
        darkText: darkText,
        lightGraphic: lightText,
        mediumGraphic: mediumText,
        darkGraphic: darkText,
        editScreenHeader: '#293462',
        selected: '#293462',
        selectedText: '#000',
        unSelected: '#8c8c8c',
        unSelectedText: '#fff',
        navBarInactiveBackground: '#293462',
        navBarInactiveText: '#CAEBF2',
        navBarActiveBackground: '#CAEBF2',
        navBarActiveText: '#000',
        navDrawerActiveBackground: '#D61C4E',
        musicIcon: '#578CFE',
        navDrawerActiveTint: '#fff',
        navDrawerInactiveBackground: '#fff',
        navDrawerInactiveTint: '#999',
        lightBlue: '#578CFE',
        buttonTextLight: '#fff',
        buttonTextDark: primaryBackground,
        buttonFillLight: '#8CABFF',
        buttonFillMedium: '#4477CE',
        buttonFillDark: '#512B81',
        buttonFillDarker: '#35155D',
        meetingActiveCard: '#CAEBF2',
        meetingHistoricCard: '#cccccc',
        groupActiveCard: '#CAEBF2',
        groupHistoricCard: '#cccccc',
    },
    fonts: {
        regular: 16,
        medium: 20,
        large: 24,
        largest: 30,
    },
    weight: {
        light: '300',
        medium: '500',
        heavy: '800',
    },
    animation: {
        scale: 30,
    },
    screenTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 28,
        fontWeight: '700',
        color: primaryColor,
        textAlign: 'center',
        paddingTop: 10,
    },
    editScreenTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 28,
        fontWeight: '700',
        color: darkText,
        textAlign: 'center',
        marginTop: 5,
        // paddingTop: 20,
    },
    subTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        color: accentColor,
        textAlign: 'center',
    },
    subTitleSmall: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        color: accentColor,
        textAlign: 'center',
    },
    paragraph: {
        fontFamily: 'Roboto-Thin',
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: primaryColor,
    },
    primaryButton: {
        fontWeight: '900',
    },
    //   Landing Screen
    landingAnnouncement: {
        fontFamily: 'Roboto-Regular',
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    landingHeroMessageContainer: {
        backgroundColor: secondaryColor,
        margin: 20,
        borderRadius: 10,
        padding: 10,
    },
    landingHeroMessageText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        textAlign: 'center',
    },
    //   SCREEN NAVIGATION
    navButtonLight: {
        color: 'white',
    },
    navButtonPrimary: {
        color: '#293462',
    },
    //   GROUPEDITSCREEN
    // groupEditSurface: {
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     width: '100%',
    // },
    // groupEditFormContainer: {
    //     width: '90%',
    // },

    //   ----------------------------
    //   DEFAULT GROUP SCREEN
    //   ----------------------------
    defaultGroupScreenSafeArea: {
        flex: 1,
    },

    //   ----------------------------
    //   PROFILE FORM
    //   ----------------------------
    defaultGroupModalContainer: {
        flex: 1,
        backgroundColor: primaryColor,
    },
    //   ----------------------------
    //   PROFILE FORM
    //   ----------------------------
    profileMessageModalSurface: {
        marginTop: 100,
        marginHorizontal: 10,
        borderRadius: 15,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    profileMessageModalTitle: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    profileMessageModalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    profileImageContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImageFrame: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 40,
    },
    profileFormRowStyle: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileFormInputTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    profileFormSectionHeader: {
        color: accentColor,
        fontSize: 26,
        fontFamily: 'Roboto-Bold',
        fontWeight: '600',
    },
    profileFormResidenceBorder: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        paddingBottom: 10,
        marginHorizontal: 5,
    },
    //   TEAM CARD STYLES
    teamMemberImage: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 40,
    },
    //   GROUP EDIT
    groupEditSurface: {
        flex: 1,
    },
    groupEditRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginHorizontal: 10,
    },
    groupEditInputErrorContainer: {
        marginHorizontal: 30,
    },
    groupEditInputErrorText: {
        color: accentColor,
        fontFamily: 'Roboto-MediumItalic',
        fontSize: 18,
    },
    groupEditRowBasic: {
        marginHorizontal: 20,
        marginVertical: 5,
    },

    groupEditGenderSelectorContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 0,
    },

    groupFormRowStyle: {
        marginTop: 5,
    },
    groupFormInputTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },

    //   GROUP DETAILS CARD
    groupCardPrimary: {
        backgroundColor: primaryColor,
    },
    groupCardDetailsLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        paddingLeft: 0,
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0.5,
        color: lightText,
    },
    groupCardDetailsData: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        fontWeight: '200',
        paddingHorizontal: 5,
        color: lightText,
    },
    groupCardTopRow: {
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    groupCardRow: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 5,
    },
    groupDetailsAttendanceBadge: {
        backgroundColor: lightColor,
        textColor: darkText,
    },
    groupDetailsNotesText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        color: lightText,
        fontWeight: '200',
        letterSpacing: 0.2,
        paddingBottom: 10,
    },
    //   MEETING CARD - ACTIVE
    meetingCardActivePrimary: {
        backgroundColor: primaryColor,
    },
    meetingCardActiveTypeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 0,
    },
    meetingCardActiveTitleText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        paddingLeft: 0,
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.5,
    },
    meetingCardActivePersonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        paddingLeft: 0,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    meetingCardActiveDateBall: {
        fontFamily: 'Roboto-Regular',
        backgroundColor: accentColor,
        textColor: darkText,
    },
    //   MEETING CARD - HISTORIC
    meetingCardHistoricPrimary: {
        backgroundColor: historyTileColor,
    },
    meetingCardHistoricTypeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 20,
    },
    meetingCardHistoricTitleText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 26,
        paddingLeft: 20,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    meetingCardHistoricPersonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        paddingLeft: 20,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    meetingCardHistoricAttendanceBadge: {
        backgroundColor: primaryBackground,
    },
    //   MEETING CARD - COMMON
    meetingCardActiveAccent: {
        backgroundColor: accentColor,
    },
    meetingCardTypeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        fontWeight: '600',
        paddingLeft: 20,
    },
    meetingCardTitleText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 26,
        paddingLeft: 20,
        fontWeight: '600',
        letterSpacing: 0.5,
        //borderWidth: 1,
        //borderColor: 'blue',
    },
    meetingCardPersonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        paddingLeft: 20,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    //   MEETING EDIT
    meetingEditNavDeleteButton: {
        backgroundColor: 'red',
        color: 'white",',
    },
    meetingEditTypeSelectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
    meetingEditFirstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginHorizontal: 10,
    },
    meetingEditDateWrapper: { margin: 5 },
    meetingEditIOSDataCompContainer: { padding: 5 },
    meetingEditAndroidDataCompContainer: { padding: 1 },
    meetingEditInputLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        color: 'white',
        marginLeft: 10,
    },
    meetingEditBasicRow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    meetingEditMealRow: {
        marginTop: 1,
        marginVertical: 4,
        marginRight: 30,
    },
    meetingEditMealLabelContainer: {
        width: '50%',
        paddingLeft: 'auto',
    },
    meetingEditMealLabelText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
    },
    meetingEditMealInputContainer: {
        width: '60%',
        paddingRight: 'auto',
    },
    meetingEditMealContactRow: {
        marginTop: 5,
        marginRight: 30,
        marginBottom: 10,
    },
    meetingEditMealContactContainer: {
        width: '50%',
        paddingRight: 'auto',
    },
    meetingEditMealNumberText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
    },
    meetingEditMealNumberContainer: {
        // width: '55%',
        // marginRight: 10,
        paddingRight: 'auto',
    },
    meetingEditNumberLabelContainer: {
        width: '45%',
        paddingLeft: 'auto',
    },
    //   MEETING DELETE
    meetingEditDeleteModalText: {
        color: 'white',
    },
    meetingEditDeleteModalSurface: {
        marginTop: 100,
        marginHorizontal: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    meetingEditDeleteModalTitle: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    meetingEditDeleteModalMeetingContainer: {
        marginVertical: 20,
    },
    meetingEditDeleteModalMeetingDate: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    meetingEditDeleteModalMeetingText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    meetingEditDeleteModalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },

    meetingDetailsTypeContainer: {},
    //   MEETING DETAILS
    meetingDetailsTypeContainer: {},
    detailsTitle: {
        fontFamily: 'Roboto-Bold',
        color: lightText,
        fontSize: 24,
        marginLeft: 10,
    },
    detailsRowLabel: {
        fontFamily: 'Roboto-Regular',
        color: lightText,
        fontSize: 24,
        fontWeight: '400',
    },
    meetingDetailsNotesContainer: {
        //flexDirection: 'column',
        marginHorizontal: 10,
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: lightColor,
        //justifyContent: 'center',
    },
    meetingDetailsNotesText: {
        color: darkText,
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
    },
    meetingDetailsGroupLoadingContainer: {},
    meetingDetailsGroupLoadingText: {
        color: lightText,
        fontFamily: 'Roboto-Thin',
        fontSize: 14,
    },
    groupDetailsMealText: {
        fontFamily: 'Roboto-Regular',
        color: lightText,

        fontSize: 24,
        padding: 10,
    },
    detailsRowValue: {
        fontFamily: 'Roboto-Regular',
        color: lightText,
        fontSize: 24,
        padding: 10,
    },
    detailsBadge: {
        backgroundColor: lightColor,
        textColor: darkText,
    },
    //   DATE BALL/CHIP
    dateChipContainer: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        alignItems: 'center',
        borderRadius: 20,
    },
    dateChipNonDayText: {
        color: darkText,
    },
    dateChipDayText: {
        color: darkText,
        fontSize: 28,
        fontWeight: '700',
    },
    //   SCREEN BACKGROUND
    screenSurface: {
        flex: 1,
        backgroundColor: primaryBackground,
    },
    //   GROUP LIST CARD
    groupListCardAttendanceBadge: {
        backgroundColor: primaryBackground,
        color: lightText,
    },
    groupListCardTitle: {
        fontFamily: 'Roboto-Bold',
        color: darkText,
        fontWeight: '600',
        fontSize: 24,
    },
    groupListCardText: {
        fontFamily: 'Roboto-Regular',
        color: darkText,
        fontSize: 20,
    },
    //   Date Stack UI Component
    dateStackContainer: {
        backgroundColor: accentColor,
        paddingVertical: 1,
        paddingHorizontal: 10,
        width: 90,
        height: 90,
        borderRadius: 8,
        textAlign: 'center',
    },
    dateStackDay: {
        fontFamily: 'Roboto-Regular',
        color: darkText,
        fontSize: 28,
        fontWeight: '900',
    },
    dateStackText: {
        fontFamily: 'Roboto-Regular',
        color: darkText,
        fontSize: 14,
        fontWeight: '900',
    },
};
export default theme;
