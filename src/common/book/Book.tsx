/**
 * The book is a dark black color with white text.
 * The book has rows of verses.
 * Each verse has between 1 and 3 columns of text.
 * The text is the verse itself in each language.
 * Tapping on the right side of the verse moves the book forward.
 * Tapping on the left side of the verse moves the book backward.
 * There is a drawer that opens by swiping from the right.
 * The drawer is a list of buttons that direct the user to the appropriate page of the book.
 */

import React, { useState } from "react";
import { Alert, Dimensions, FlatList, ListRenderItem, ListRenderItemInfo, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CopticDate from "../dates/CopticDate";
import styles from "../styles";

interface book_inputs {
    which_book: string;
    copticDate: CopticDate;
}
interface asset_json {
    [key: string]: Hymns;
}

interface Hymns {
    [key: string]: Hymn;
}

interface Hymn {
    eng: string[] | null;
    cop: string[] | null;
    ara: string[] | null;
}

interface verse {
    eng: string | null;
    cop: string | null;
    ara: string | null;
}


type data = verse | string;
interface book_state {
    which_book: string;
    copticDate: CopticDate;
    hymns: Hymns;
    data: data[];
    scrollEnabled: boolean;

    current_hymn_index: number;
    current_verse: number;
    slice: number;
}


class Book extends React.Component<book_inputs, book_state> {
    flatListRef: FlatList<data> | null = null;
    bottom_hymn_index: number = 0;
    top_hymn_index: number = 0;
    width: number = 0;

    slice: number = -1;
    finished_hymn: boolean = false;
    current_hymn: Hymn = {} as Hymn;
    max_verse_index: number = 0;
    height: number = 0;

    lowest_visible: number = 0;
    highest_visible: number = 0;
    last_lowest_visible: number = 0;
    last_highest_visible: number = 0;
    back_scroll = {
        avoid_index: 0,
        keep_scrolling: false,
    }

    constructor(props: {
        navigation: any
        route: { params: book_inputs }
    }) {
        // @ts-ignore
        super(props);
        const hymns = this.getHymns(props.route.params.which_book, props.route.params);
        this.state = {
            which_book: props.route.params.which_book,
            copticDate: props.route.params.copticDate,
            hymns: hymns,
            data: this.getData(hymns),
            scrollEnabled: false,
            current_hymn_index: 0,
            current_verse: -1,
            slice: 0,
        }
        this.width = Dimensions.get("window").width;
        this.current_hymn = hymns[Object.keys(hymns)[0]];
        this.max_verse_index = this.max_verse(this.current_hymn);
    }

    max_verse(hymn: Hymn): number {
        return Math.max(hymn.eng ? hymn.eng.length : 0, hymn.cop ? hymn.cop.length : 0, hymn.ara ? hymn.ara.length : 0);
    }

    getHymns(which_book: string, props: book_inputs) {
        let asset_json: asset_json = {};
        if (which_book === "Melodies")
            asset_json = require(`../../assets/texts/melodies.json`);
        else
            throw new Error(`Unknown book: ${JSON.stringify(props)}`);
        const out = {} as Hymns;
        Object.entries(asset_json).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
                out[key2] = value2;
            });
        });
        return out;
    }

    getData(hymns: Hymns): data[] {
        const out: data[] = [];

        Object.entries(hymns).forEach(([title, hymn]) => {
            out.push(title);
            const max_index = Math.max(hymn.eng ? hymn.eng.length : 0, hymn.cop ? hymn.cop.length : 0, hymn.ara ? hymn.ara.length : 0);
            for (let i = 0; i < max_index; i++) {
                const eng = hymn.eng ? hymn.eng[i] : null;
                const cop = hymn.cop ? hymn.cop[i] : null;
                const ara = hymn.ara ? hymn.ara[i] : null;
                out.push({ eng, cop, ara });
            }
        });
        return out;
    }

    renderItem = ({ item }: ListRenderItemInfo<data>) => {
        // renderItem = (item: string | verse) => {
        if (typeof item === "string") {
            this.height = 0;
            return <Text style={styles.verse_title}
                onLayout={(event) => {
                    this.height = event.nativeEvent.layout.height;
                }}>{item}</Text>;
        }
        else
            return <View style={styles.verse}
                onLayout={(event) => {
                    this.height += event.nativeEvent.layout.height;
                }}>{
                    item.eng ? <Text style={styles.verse_text}>{item.eng}</Text> : null
                }{
                    item.cop ? <Text style={styles.verse_text}>{item.cop}</Text> : null
                }{
                    item.ara ? <Text style={styles.verse_text}>{item.ara}</Text> : null
                }
            </View>
    }
    title = () => {
        if (this.state.current_verse === -1) {
            return (
                <Text style={styles.verse_title}>
                    {Object.keys(this.state.hymns)[this.state.current_hymn_index]}
                </Text>
            )
        }
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.book_container} >
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) =>
                        (item as data).toString() + index.toString()
                    }
                    scrollEnabled={this.state.scrollEnabled}
                    windowSize={3}
                    onTouchEnd={event => {
                        const forward = (event.nativeEvent.pageX > 0.5 * this.width);

                        if (!forward)
                            this.back_scroll = {
                                avoid_index: this.top_hymn_index,
                                keep_scrolling: true,
                            };
                        this.flatListRef?.scrollToIndex({
                            animated: false,
                            index: forward
                                ? (this.bottom_hymn_index + 1 > this.state.data.length ? this.state.data.length : this.bottom_hymn_index + 1)
                                : (this.top_hymn_index - 1 < 0 ? 0 : this.top_hymn_index - 1),
                            viewPosition: 0,
                            viewOffset: 0,
                        });
                    }}
                    ref={ref => this.flatListRef = ref}
                    removeClippedSubviews={true}
                    onScrollToIndexFailed={(info) => {
                        Alert.alert("Scroll failed");
                        console.warn(JSON.stringify(info));
                    }}
                    onViewableItemsChanged={(info) => {

                        const bottom_index = info.viewableItems[info.viewableItems.length - 1].index
                        if (bottom_index !== null)
                            this.bottom_hymn_index = bottom_index;
                        const top_index = info.viewableItems[0].index
                        if (top_index !== null)
                            this.top_hymn_index = top_index;

                        if (this.back_scroll.keep_scrolling) {
                            const index = (this.top_hymn_index - 1 < 0 ? 0 : this.top_hymn_index - 1)

                            if (this.back_scroll.avoid_index <= this.bottom_hymn_index || index === 0) {
                                this.back_scroll.keep_scrolling = false;
                            }
                            this.flatListRef?.scrollToIndex({
                                animated: false,
                                index: index,
                                viewPosition: 0,
                                viewOffset: 0,
                            });
                        }
                    }}
                    viewabilityConfig={{
                        viewAreaCoveragePercentThreshold: 100,
                    }}
                />
            </SafeAreaView>
        );
    }
}


export default Book;
