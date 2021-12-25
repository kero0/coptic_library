enum Feasts {
    ANNUAL = 1 << 0,
    NAYROUZ = 1 << 1,
    FEAST_OF_THE_CROSS = 1 << 2,
    KIAHK = 1 << 3,
    NATIVITY_PARAMOUN = 1 << 4,
    NATIVITY = 1 << 5,
    SECOND_DAY_OF_NATIVITY = 1 << 6,
    CIRCUMCISION = 1 << 7,
    THEOPHANY_PARAMOUN = 1 << 8,
    THEOPHANY = 1 << 9,
    WEDDING_AT_CANNA_OF_GALILEE = 1 << 10,
    JONAH_S_FAST = 1 << 11,
    PRESENTATION_OF_THE_LORD_IN_THE_TEMPLE = 1 << 12,
    JONAH_S_PASSOVER = 1 << 13,
    SATURDAY_BEFORE_LENT = 1 << 14,
    WEEKDAY_OF_LENT = 1 << 15,
    WEEKEND_OF_LENT = 1 << 16,
    ANNUNCIATION = 1 << 17,
    LAZARUZ_SATURDAY = 1 << 18,
    PALM_SUNDAY = 1 << 19,
    COVENANT_THURSDAY = 1 << 20,
    GOOD_FRIDAY = 1 << 21,
    BRIGHT_SATURDAY = 1 << 22,
    HOLY_WEEK = 1 << 23,
    EASTER_SUNDAY = 1 << 24,
    SECOND_DAY_OF_EASTER = 1 << 25,
    THOMAS_SUNDAY = 1 << 26,
    HOLY_FIFTY_DAY = 1 << 27,
    ENTRANCE_OF_THE_LORD_INTO_EGYPT = 1 << 28,
    ASCENSION = 1 << 29,
    PENTECOST = 1 << 30,
    APOSTLES_FAST = 1 << 31,
    APOSTLES_FEAST = 1 << 32,
    TRANSFIGURATION = 1 << 33,
    ST_MARY_S_FAST = 1 << 34,
    ST_MARY_S_FEAST = 1 << 35,
}

namespace Feasts {
    export function toString(feast: Feasts): string {
        switch (feast) {
            case Feasts.ANNUAL: return "Annual";
            case Feasts.NAYROUZ: return "Nayrouz";
            case Feasts.FEAST_OF_THE_CROSS: return "Feast of the Cross";
            case Feasts.KIAHK: return "Kiahk";
            case Feasts.NATIVITY_PARAMOUN: return "Paramon of Nativity";
            case Feasts.NATIVITY: return "Nativity";
            case Feasts.SECOND_DAY_OF_NATIVITY: return "Second Day of Nativity";
            case Feasts.CIRCUMCISION: return "Circumcision";
            case Feasts.THEOPHANY_PARAMOUN: return "Paramoun of Theophany";
            case Feasts.THEOPHANY: return "Theophany";
            case Feasts.WEDDING_AT_CANNA_OF_GALILEE: return "Wedding at Canna of Galilee";
            case Feasts.JONAH_S_FAST: return "Jonah's Fast";
            case Feasts.PRESENTATION_OF_THE_LORD_IN_THE_TEMPLE: return "Presentation of the Lord in the Temple";
            case Feasts.JONAH_S_PASSOVER: return "Jonah's Passover";
            case Feasts.SATURDAY_BEFORE_LENT: return "Saturday before Lent";
            case Feasts.WEEKDAY_OF_LENT: return "Weekday of Lent";
            case Feasts.WEEKEND_OF_LENT: return "Weekend of Lent";
            case Feasts.ANNUNCIATION: return "Annunciation";
            case Feasts.LAZARUZ_SATURDAY: return "Lazaruz Saturday";
            case Feasts.PALM_SUNDAY: return "Palm Sunday";
            case Feasts.COVENANT_THURSDAY: return "Covenant Thursday";
            case Feasts.GOOD_FRIDAY: return "Good Friday";
            case Feasts.BRIGHT_SATURDAY: return "Bright Saturday";
            case Feasts.HOLY_WEEK: return "Holy Week";
            case Feasts.EASTER_SUNDAY: return "Easter Sunday";
            case Feasts.SECOND_DAY_OF_EASTER: return "Second Day of Easter";
            case Feasts.THOMAS_SUNDAY: return "Thomas Sunday";
            case Feasts.HOLY_FIFTY_DAY: return "Holy Fifty Day";
            case Feasts.ENTRANCE_OF_THE_LORD_INTO_EGYPT: return "Entrance of the Lord into Egypt";
            case Feasts.ASCENSION: return "Ascension";
            case Feasts.PENTECOST: return "Pentecost";
            case Feasts.APOSTLES_FAST: return "Apostles Fast";
            case Feasts.APOSTLES_FEAST: return "Apostles Feast";
            case Feasts.TRANSFIGURATION: return "Transfiguration";
            case Feasts.ST_MARY_S_FAST: return "St. Mary's Fast";
            case Feasts.ST_MARY_S_FEAST: return "St. Mary's Feast";
            default: return "";
        }
    }
    export function toStringArray(feast: Feasts): string[] {
        const feasts: string[] = [];
        for (let i = 0; i < 35; i++) {
            if ((feast & (1 << i)) !== 0) {
                feasts.push(toString(1 << i));
            }
        }
        return feasts;
    }
}


export default Feasts;
