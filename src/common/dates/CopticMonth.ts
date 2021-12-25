/**
 * Coptic Month enumeration
 * @enum {number}
 * @readonly
 */
enum CopticMonth {
    THOUT = "Thout",
    PAOPEI = "Paopei",
    HATHOR = "Hathor",
    KIAHK = "Kiahk",
    TOBE = "Tobe",
    MESHIR = "Meshir",
    PARAMHAT = "Paramhat",
    PARAMHOTEP = "Paramhotep",
    PASHANS = "Pashans",
    PAONE = "Paone",
    APIP = "Apip",
    MESRA = "Mesra",
    PIKOJI_EN_AVOT = "Pikoji En Avot",
};

namespace CopticMonth {
    /**
     * Get the Coptic month from the number of days since the Coptic Epoch
     * @param {number}
     * @returns {CopticMonth}
     * @readonly
     * @memberof CopticMonth
     * @method getMonth
     * @static
     * @example
     * CopticMonth.getMonth(0); // Thout
     * CopticMonth.getMonth(30); // Paopei
     * CopticMonth.getMonth(60); // Hathor
     * CopticMonth.getMonth(90); // Kiahk
     * CopticMonth.getMonth(120); // Tobe
     * CopticMonth.getMonth(150); // Meshir
     * CopticMonth.getMonth(180); // Paramhat
     * CopticMonth.getMonth(210); // Paramhotep
     * CopticMonth.getMonth(240); // Pashans
     * CopticMonth.getMonth(270); // Paone
     * CopticMonth.getMonth(300); // Apip
     * CopticMonth.getMonth(330); // Mesra
     * CopticMonth.getMonth(365); // Pikoji En Avot
     */
    export function getMonth(days: number): CopticMonth {

        switch (Math.floor(days / 30)) {
            case 0: return CopticMonth.THOUT;
            case 1: return CopticMonth.PAOPEI;
            case 2: return CopticMonth.HATHOR;
            case 3: return CopticMonth.KIAHK;
            case 4: return CopticMonth.TOBE;
            case 5: return CopticMonth.MESHIR;
            case 6: return CopticMonth.PARAMHAT;
            case 7: return CopticMonth.PARAMHOTEP;
            case 8: return CopticMonth.PASHANS;
            case 9: return CopticMonth.PAONE;
            case 10: return CopticMonth.APIP;
            case 11: return CopticMonth.MESRA;
            case 12: return CopticMonth.PIKOJI_EN_AVOT;
            default: throw new Error("Invalid days value: " + days);
        }
    }
}

export default CopticMonth;
