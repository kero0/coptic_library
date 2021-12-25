import CopticMonth from "./CopticMonth";

/**
 * CopticDate class
 * This is a wrapper class for the Coptic calendar.
 * @class
 * @param {number} year - The year
 * @param {CopticMonth} month - The month
 * @param {number} day - The day
 */

class CopticDate {
    private year: number;
    private month: CopticMonth;
    private day: number;

    constructor(date: Date) {
        let year = date.getFullYear();
        const month = date.getMonth(),
            day = date.getUTCDate()
        year -= ((
            (month > 8) ||
            (month == 8 && day > 11) ||
            (month == 8 && day == 11 && (year % 4 == 0))
        ) ? 0 : 1);

        this.year = year - 283;

        const last_new_year = new Date(year, 8, ((year + 1) % 4 == 0) ? 12 : 11);

        const days_apart = DaysBetween(last_new_year, date) + 1;
        this.month = CopticMonth.getMonth(days_apart);
        this.day = days_apart % 30;
    }

    public formatted_date(): string {
        return ` ${this.month} ${this.day}, ${this.year}`;

    }
}


// copied from https://stackoverflow.com/a/17727953
function DaysBetween(StartDate: Date, EndDate: Date): number {
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
    const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
}

export default CopticDate;
