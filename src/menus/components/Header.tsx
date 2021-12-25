import React from "react";
import { View, Image, Text, Button } from "react-native";
import CopticDate from "../../common/dates/CopticDate";
import styles from "../../common/styles";

/**
 * Header component displays the date and the calendar button.
 * Also has a nice picture of the saints on the left.
 */
const Header: React.FC<{
    date: Date;
    handleSettings: () => void;
    handleCalendar: () => void;
}> = ({ date, handleSettings, handleCalendar }) => (
    <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Image
                source={require("../../assets/images/saints.jpeg")}
                style={styles.headerImage} />
        </View>
        <View style={styles.headerRight}>
            <View style={styles.headerRightTop}>
                <Text style={styles.gregorian_date}>
                    {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Text>
                <Text style={styles.coptic_date}>
                    {new CopticDate(date).formatted_date()}
                </Text>
            </View>
            <View style={styles.headerRightBottom}>
                <Button
                    title="Settings"
                    onPress={handleSettings}
                    color="#6e6e6e" />
                <Button
                    title="Calendar"
                    onPress={handleCalendar}
                    color="#6e6e6e" />
            </View>
        </View>
    </View>
)

export default Header;
