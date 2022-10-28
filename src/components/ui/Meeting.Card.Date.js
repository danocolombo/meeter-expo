import { Text, TextInput, View, StyleSheet } from 'react-native';
import { printObject } from '../../utils/helpers';
import { useTheme } from 'react-native-paper';
function MeetingCardDate({ date }) {
    const meeterTheme = useTheme();
    if (!date) {
        return null;
    }
    //   YYYY-MM-DD get rid of dashes
    // console.log('date:', date);
    const parts = date.split('-');
    const yr = parts[0];
    const mo = parts[1];
    const da = parts[2];
    let month = '';
    switch (mo) {
        case '01':
            month = 'JAN';
            break;
        case '02':
            month = 'FEB';
            break;
        case '03':
            month = 'MAR';
            break;
        case '04':
            month = 'APR';
            break;
        case '05':
            month = 'MAY';
            break;
        case '06':
            month = 'JUN';
            break;
        case '07':
            month = 'JUL';
            break;
        case '08':
            month = 'AUG';
            break;
        case '09':
            month = 'SEP';
            break;
        case '10':
            month = 'OCT';
            break;
        case '11':
            month = 'NOV';
            break;
        case '12':
            month = 'DEC';
            break;
        default:
            break;
    }
    let day = da.slice(0, 1);
    if (day === '0') {
        day = da.slice(1, 2);
    } else {
        day = da;
    }
    return (
        <View
            style={[
                Styles.container,
                { backgroundColor: meeterTheme.colors.accent },
            ]}
        >
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={[
                        Styles.text,
                        { color: meeterTheme.colors.darkText },
                    ]}
                >
                    {month} {day}
                </Text>
            </View>
        </View>
    );
}
export default MeetingCardDate;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 8,
        minWidth: 80,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,

        fontWeight: '900',
    },
});
