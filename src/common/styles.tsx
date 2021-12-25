import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },

    gregorian_date: {
        fontSize: 18,
        fontWeight: '400',
    },
    coptic_date: {
        fontSize: 18,
        fontWeight: '400',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRightTop: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRightBottom: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    headerImage: {
        maxWidth: 150,
        maxHeight: 200,
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    // Book styles
    book: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // padding: 10,
        // marginTop: 100,
        flex: 1,
    },
    verse: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10,
        // marginTop: 100,
        flex: 1,
    },
    verse_title: {
        display: 'flex',
        fontSize: 24,
        fontWeight: '800',
        padding: 15,
        textAlign: 'center',
    },
    verse_text: {
        display: 'flex',
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        padding: 2,
    },
    book_container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
});


export default styles; 
