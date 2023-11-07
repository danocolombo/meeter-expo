import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
//* ---------------------------------------
//* ANDROID display of date
//* ---------------------------------------
function DateStack({ date }) {
    const mtrTheme = useTheme();
    let month = '';
    let day = '';
    let yr = '';
    let mo = '';
    let da = '';
    try {
        if (!date) {
            return null;
        }
        //in case they send /, change to -
        const refinedDate = date.replace(/\//g, '-');
        const parts = refinedDate.split('-');
        mo = parts[0];
        da = parts[1];
        // add centuries to years
        yr = '20' + parts[2];
        // let month = '';

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
        day = da.slice(0, 1);
        if (day === '0') {
            day = da.slice(1, 2);
        } else {
            day = da;
        }
    } catch (error) {
        console.log('caught da');
    }

    // return (
    //     <View style={mtrTheme.dateStackContainer}>
    //         <View style={{ alignItems: 'center' }}>
    //             <Text></Text>
    //         </View>
    //     </View>
    // );
    return (
        <View style={mtrTheme.dateStackContainer}>
            <View style={{ alignItems: 'center' }}>
                <Text style={mtrTheme.dateStackText}>{month}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={mtrTheme.dateStackDay}>{da}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={mtrTheme.dateStackText}>{yr}</Text>
            </View>
        </View>
    );
}
export default DateStack;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        // minWidth: 100,
        textAlign: 'center',
    },
    moDa: {
        fontSize: 14,
        color: 'black',
        fontWeight: '900',
    },
    year: {
        fontSize: 14,
        color: 'black',
        fontWeight: '900',
    },
});
