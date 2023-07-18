import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
//* -----------------------------------
//* IOS date display
//* -----------------------------------
const DateBall = ({ date }) => {
    const mtrTheme = useTheme();
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
        <View>
            <View style={mtrTheme.dateChipContainer}>
                <View style={styles.monthContainer}>
                    <Text style={mtrTheme.dateChipNonDayText}>{month}</Text>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={mtrTheme.dateChipDayText}>{day}</Text>
                </View>
                <View style={styles.yearContainer}>
                    <Text style={mtrTheme.dateChipNonDayText}>{yr}</Text>
                </View>
            </View>
        </View>
    );
};
export default DateBall;

const styles = StyleSheet.create({
    objectContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    monthContainer: {
        position: 'absolute',
        top: 5,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'top',
        alignItems: 'center',
    },
    monthText: { color: 'white', fontWeight: '400' },
    dayContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'top',
        alignItems: 'center',
    },
    dayText: { color: 'white', fontSize: 30 },
    yearContainer: {
        top: 23,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'top',
        alignItems: 'center',
    },
    yearText: { color: 'white', fontWeight: '400' },
});
