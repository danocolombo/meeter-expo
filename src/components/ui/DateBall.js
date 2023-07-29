import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const DateBall = ({ date }) => {
    const mtrTheme = useTheme();
    if (!date) {
        return null;
    }

    const formatDateComponent = (component) => {
        return component.toString().replace(',', '');
    };

    const formatDateString = (inputDate) => {
        const dateObj = new Date(inputDate);
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const day = formatDateComponent(dateObj.getDate());

        const year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const formattedDate = formatDateString(date);
    const [month, day, year] = formattedDate.split(' ');
    // console.log('DB:26-->date:', date);
    return (
        <View>
            <View style={mtrTheme.dateChipContainer}>
                <View style={styles.monthContainer}>
                    <Text style={mtrTheme.dateChipNonDayText}>{month}</Text>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={mtrTheme.dateChipDayText}>
                        {day.slice(0, -1)}
                    </Text>
                </View>
                <View style={styles.yearContainer}>
                    <Text style={mtrTheme.dateChipNonDayText}>{year}</Text>
                </View>
            </View>
        </View>
    );
};

export default DateBall;

const styles = StyleSheet.create({
    // Your styles here...
});
