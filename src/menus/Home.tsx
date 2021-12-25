/**
 * This is the home page.
 * It has a header with the current Coptic date and the current Coptic year.
 * The header also informs the user of any feasts or saints' commemorations for the current date.
 * The header also has a button to open the settings page.
 * The header also has a button to open the calendar page.
 * The rest of the home page is a grid of buttons that open the appropriate pages.
 */

import React, { useState } from "react";
import { Alert, Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "./components/Header";
import CopticDate from "../common/dates/CopticDate";
import { version } from "../../app.json";


const Home = ({ navigation }: any) => {
    const [date, setDate] = useState(new Date());
    const [settings, setSettings] = useState(false);
    const [calendarVisibility, setCalendarVisibility] = useState(false);


    const handleSettings = () => {
        setSettings(!settings);
    };

    AsyncStorage.getItem('first_launch').then((res) => {
        let value: Boolean = JSON.parse(res || 'true');
        value = true;
        if (value)
            AsyncStorage.multiSet([
                ['first_launch', 'true'],
                ['settings', JSON.stringify({
                    language: 'eng',
                    book_type: 'presentation',
                    languages: ['eng', 'cop', 'ara'],
                }),],
                ['last_version', version]
            ]);
        else AsyncStorage.getItem('last_version').then((value) => {
            if (value !== version)
                Alert.alert('New version', 'New version available.');
        });
    }).catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Error getting first launch data');
    });

    AsyncStorage.getItem('date').then(res => {
        if (res) {
            const d = JSON.parse(res);
            setDate(new Date(
                d.year || date.getFullYear(),
                d.month || date.getMonth(),
                d.day || date.getDate(),
            ));
        }
    }).catch(err => {
        console.log(err);
        Alert.alert('Error', 'Could not load date from storage. Please try again and if this error persists then inform the dev.');
    });

    return (
        <View>
            <Header
                date={date}
                handleSettings={handleSettings}
                handleCalendar={() => {
                    setCalendarVisibility(true);
                }}
            />
            <DateTimePickerModal
                date={date}
                isVisible={calendarVisibility}
                mode="date"
                onConfirm={date => {
                    setDate(date);
                    setCalendarVisibility(false);
                    AsyncStorage.setItem('date', JSON.stringify({
                        year: date.getFullYear(),
                        month: date.getMonth(),
                        day: date.getDate()
                    }));
                }}
                onCancel={() => {
                    setCalendarVisibility(false);
                }}
            />
            <Button
                title="Melodies"
                onPress={() => {
                    console.log("Melodies");
                    // Alert.alert("Melodies");
                    navigation.navigate('Book', {
                        copticDate: new CopticDate(date),
                        which_book: 'Melodies',
                    });

                }}
            />
        </View>
    );
};


export default Home;


