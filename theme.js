import { DefaultTheme } from 'react-native-paper';
const primaryBackground = '#293462';
//const primaryColor = '#1CD6CE';
const primaryColor = '#CAEBF2';
const accentColor = '#FEDB39';
const alternateColor = '#D61C4E';
const historyTileColor = '#fff';
const darkColor = '#000';
const lightColor = '#fff';
const darkText = '#000';
const lightText = '#fff';

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
        accent: accentColor,
        //background color for pages, such as lists
        background: primaryBackground,
        // background color for elements containing content, such as cards
        surface: primaryBackground,
        text: '#eee',
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
        critical: 'red',
        notification: 'red',
        navActive: '#D61C4E',
        navInactive: '#8c8c8c',
        darkText: darkText,
        black: '#000',
        lightText: lightText,
        editScreenHeader: '#293462',
        selected: '#293462',
        selectedText: '#fff',
        unSelected: '#8c8c8c',
        unSelectedText: '#fff',
        navBarInactiveBackground: '#293462',
        navBarInactiveText: '#FEDB39',
        navBarActiveBackground: '#FEDB39',
        navBarActiveText: '#000',
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
        paddingTop: 20,
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
    //   SCREEN NAVIGATION
    navButtonLight: {
        color: 'white',
    },
    navButtonPrimary: {
        color: '#293462',
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
        marginTop: 15,
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
        width: '55%',
        paddingRight: 'auto',
    },
    meetingEditNumberLabelContainer: {
        width: '50%',
        paddingLeft: 'auto',
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
