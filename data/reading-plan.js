// 300-Day Catholic Bible Reading Plan
// Each day includes 5 categories: Psalm, Gospel, Wisdom, Old Testament, New Testament

const READING_PLAN = [
    {
        day: 1,
        psalm: { book: "Psalm", chapter: "1" },
        gospel: { book: "John", chapter: "1" },
        wisdom: { book: "Job", chapter: "1-2" },
        oldTestament: { book: "Genesis", chapter: "1-3" },
        newTestament: { book: "Romans", chapter: "1" }
    },
    {
        day: 2,
        psalm: { book: "Psalm", chapter: "2" },
        gospel: { book: "John", chapter: "2" },
        wisdom: { book: "Job", chapter: "3" },
        oldTestament: { book: "Genesis", chapter: "4-6" },
        newTestament: { book: "Romans", chapter: "2" }
    },
    {
        day: 3,
        psalm: { book: "Psalm", chapter: "3" },
        gospel: { book: "John", chapter: "3" },
        wisdom: { book: "Job", chapter: "4" },
        oldTestament: { book: "Genesis", chapter: "7-9" },
        newTestament: { book: "Romans", chapter: "3" }
    },
    {
        day: 4,
        psalm: { book: "Psalm", chapter: "4" },
        gospel: { book: "John", chapter: "4" },
        wisdom: { book: "Job", chapter: "5" },
        oldTestament: { book: "Genesis", chapter: "10-11" },
        newTestament: { book: "Romans", chapter: "4" }
    },
    {
        day: 5,
        psalm: { book: "Psalm", chapter: "5" },
        gospel: { book: "John", chapter: "5" },
        wisdom: { book: "Job", chapter: "6" },
        oldTestament: { book: "Genesis", chapter: "12-15" },
        newTestament: { book: "Romans", chapter: "5" }
    },
    {
        day: 6,
        psalm: { book: "Psalm", chapter: "6" },
        gospel: { book: "John", chapter: "6" },
        wisdom: { book: "Job", chapter: "7" },
        oldTestament: { book: "Genesis", chapter: "16-18" },
        newTestament: { book: "Romans", chapter: "6" }
    },
    {
        day: 7,
        psalm: { book: "Psalm", chapter: "7" },
        gospel: { book: "John", chapter: "7" },
        wisdom: { book: "Job", chapter: "8" },
        oldTestament: { book: "Genesis", chapter: "19-20" },
        newTestament: { book: "Romans", chapter: "7" }
    },
    {
        day: 8,
        psalm: { book: "Psalm", chapter: "8" },
        gospel: { book: "John", chapter: "8" },
        wisdom: { book: "Job", chapter: "9" },
        oldTestament: { book: "Genesis", chapter: "21-23" },
        newTestament: { book: "Romans", chapter: "8" }
    },
    {
        day: 9,
        psalm: { book: "Psalm", chapter: "9" },
        gospel: { book: "John", chapter: "9" },
        wisdom: { book: "Job", chapter: "10" },
        oldTestament: { book: "Genesis", chapter: "24" },
        newTestament: { book: "Romans", chapter: "9" }
    },
    {
        day: 10,
        psalm: { book: "Psalm", chapter: "10" },
        gospel: { book: "John", chapter: "10" },
        wisdom: { book: "Job", chapter: "11" },
        oldTestament: { book: "Genesis", chapter: "25-26" },
        newTestament: { book: "Romans", chapter: "10" }
    },
    {
        day: 11,
        psalm: { book: "Psalm", chapter: "11" },
        gospel: { book: "John", chapter: "11" },
        wisdom: { book: "Job", chapter: "12" },
        oldTestament: { book: "Genesis", chapter: "27-28" },
        newTestament: { book: "Romans", chapter: "11" }
    },
    {
        day: 12,
        psalm: { book: "Psalm", chapter: "12" },
        gospel: { book: "John", chapter: "12" },
        wisdom: { book: "Job", chapter: "13" },
        oldTestament: { book: "Genesis", chapter: "29-30" },
        newTestament: { book: "Romans", chapter: "12" }
    },
    {
        day: 13,
        psalm: { book: "Psalm", chapter: "13" },
        gospel: { book: "John", chapter: "13" },
        wisdom: { book: "Job", chapter: "14" },
        oldTestament: { book: "Genesis", chapter: "31" },
        newTestament: { book: "Romans", chapter: "13" }
    },
    {
        day: 14,
        psalm: { book: "Psalm", chapter: "14" },
        gospel: { book: "John", chapter: "14" },
        wisdom: { book: "Job", chapter: "15" },
        oldTestament: { book: "Genesis", chapter: "32" },
        newTestament: { book: "Romans", chapter: "14" }
    },
    {
        day: 15,
        psalm: { book: "Psalm", chapter: "15" },
        gospel: { book: "John", chapter: "15" },
        wisdom: { book: "Job", chapter: "16" },
        oldTestament: { book: "Genesis", chapter: "33-35" },
        newTestament: { book: "Romans", chapter: "15" }
    },
    {
        day: 16,
        psalm: { book: "Psalm", chapter: "16" },
        gospel: { book: "John", chapter: "16" },
        wisdom: { book: "Job", chapter: "17" },
        oldTestament: { book: "Genesis", chapter: "36-37" },
        newTestament: { book: "Romans", chapter: "16" }
    },
    {
        day: 17,
        psalm: { book: "Psalm", chapter: "17" },
        gospel: { book: "John", chapter: "17" },
        wisdom: { book: "Job", chapter: "18" },
        oldTestament: { book: "Genesis", chapter: "38-39" },
        newTestament: { book: "1 Corinthians", chapter: "1" }
    },
    {
        day: 18,
        psalm: { book: "Psalm", chapter: "18" },
        gospel: { book: "John", chapter: "18" },
        wisdom: { book: "Job", chapter: "19" },
        oldTestament: { book: "Genesis", chapter: "40-41" },
        newTestament: { book: "1 Corinthians", chapter: "2" }
    },
    {
        day: 19,
        psalm: { book: "Psalm", chapter: "19" },
        gospel: { book: "John", chapter: "19" },
        wisdom: { book: "Job", chapter: "20" },
        oldTestament: { book: "Genesis", chapter: "42-43" },
        newTestament: { book: "1 Corinthians", chapter: "3" }
    },
    {
        day: 20,
        psalm: { book: "Psalm", chapter: "20" },
        gospel: { book: "John", chapter: "20" },
        wisdom: { book: "Job", chapter: "21" },
        oldTestament: { book: "Genesis", chapter: "44-45" },
        newTestament: { book: "1 Corinthians", chapter: "4" }
    },
    {
        day: 21,
        psalm: { book: "Psalm", chapter: "21" },
        gospel: { book: "John", chapter: "21" },
        wisdom: { book: "Job", chapter: "22" },
        oldTestament: { book: "Genesis", chapter: "46-47" },
        newTestament: { book: "1 Corinthians", chapter: "5" }
    },
    {
        day: 22,
        psalm: { book: "Psalm", chapter: "22" },
        gospel: { book: "Matthew", chapter: "1" },
        wisdom: { book: "Job", chapter: "23" },
        oldTestament: { book: "Genesis", chapter: "48-50" },
        newTestament: { book: "1 Corinthians", chapter: "6" }
    },
    {
        day: 23,
        psalm: { book: "Psalm", chapter: "23" },
        gospel: { book: "Matthew", chapter: "2" },
        wisdom: { book: "Job", chapter: "24" },
        oldTestament: { book: "Exodus", chapter: "1-3" },
        newTestament: { book: "1 Corinthians", chapter: "7" }
    },
    {
        day: 24,
        psalm: { book: "Psalm", chapter: "24" },
        gospel: { book: "Matthew", chapter: "3" },
        wisdom: { book: "Job", chapter: "25-26" },
        oldTestament: { book: "Exodus", chapter: "4-6" },
        newTestament: { book: "1 Corinthians", chapter: "8" }
    },
    {
        day: 25,
        psalm: { book: "Psalm", chapter: "25" },
        gospel: { book: "Matthew", chapter: "4" },
        wisdom: { book: "Job", chapter: "27" },
        oldTestament: { book: "Exodus", chapter: "7-8" },
        newTestament: { book: "1 Corinthians", chapter: "9" }
    },
    {
        day: 26,
        psalm: { book: "Psalm", chapter: "26" },
        gospel: { book: "Matthew", chapter: "5" },
        wisdom: { book: "Job", chapter: "28" },
        oldTestament: { book: "Exodus", chapter: "9-10" },
        newTestament: { book: "1 Corinthians", chapter: "10" }
    },
    {
        day: 27,
        psalm: { book: "Psalm", chapter: "27" },
        gospel: { book: "Matthew", chapter: "6" },
        wisdom: { book: "Job", chapter: "29" },
        oldTestament: { book: "Exodus", chapter: "11-12" },
        newTestament: { book: "1 Corinthians", chapter: "11" }
    },
    {
        day: 28,
        psalm: { book: "Psalm", chapter: "28" },
        gospel: { book: "Matthew", chapter: "7" },
        wisdom: { book: "Job", chapter: "30" },
        oldTestament: { book: "Exodus", chapter: "13-15" },
        newTestament: { book: "1 Corinthians", chapter: "12" }
    },
    {
        day: 29,
        psalm: { book: "Psalm", chapter: "29" },
        gospel: { book: "Matthew", chapter: "8" },
        wisdom: { book: "Job", chapter: "31" },
        oldTestament: { book: "Exodus", chapter: "16-18" },
        newTestament: { book: "1 Corinthians", chapter: "13" }
    },
    {
        day: 30,
        psalm: { book: "Psalm", chapter: "30" },
        gospel: { book: "Matthew", chapter: "9" },
        wisdom: { book: "Job", chapter: "32" },
        oldTestament: { book: "Exodus", chapter: "19-21" },
        newTestament: { book: "1 Corinthians", chapter: "14" }
    },
    {
        day: 31,
        psalm: { book: "Psalm", chapter: "31" },
        gospel: { book: "Matthew", chapter: "10" },
        wisdom: { book: "Job", chapter: "33" },
        oldTestament: { book: "Exodus", chapter: "22-24" },
        newTestament: { book: "1 Corinthians", chapter: "15" }
    },
    {
        day: 32,
        psalm: { book: "Psalm", chapter: "32" },
        gospel: { book: "Matthew", chapter: "11" },
        wisdom: { book: "Job", chapter: "34" },
        oldTestament: { book: "Exodus", chapter: "25-26" },
        newTestament: { book: "1 Corinthians", chapter: "16" }
    },
    {
        day: 33,
        psalm: { book: "Psalm", chapter: "33" },
        gospel: { book: "Matthew", chapter: "12" },
        wisdom: { book: "Job", chapter: "35" },
        oldTestament: { book: "Exodus", chapter: "27-28" },
        newTestament: { book: "2 Corinthians", chapter: "1" }
    },
    {
        day: 34,
        psalm: { book: "Psalm", chapter: "34" },
        gospel: { book: "Matthew", chapter: "13" },
        wisdom: { book: "Job", chapter: "36" },
        oldTestament: { book: "Exodus", chapter: "29-30" },
        newTestament: { book: "2 Corinthians", chapter: "2" }
    },
    {
        day: 35,
        psalm: { book: "Psalm", chapter: "35" },
        gospel: { book: "Matthew", chapter: "14" },
        wisdom: { book: "Job", chapter: "37" },
        oldTestament: { book: "Exodus", chapter: "31-32" },
        newTestament: { book: "2 Corinthians", chapter: "3" }
    },
    {
        day: 36,
        psalm: { book: "Psalm", chapter: "36" },
        gospel: { book: "Matthew", chapter: "15" },
        wisdom: { book: "Job", chapter: "38" },
        oldTestament: { book: "Exodus", chapter: "33-34" },
        newTestament: { book: "2 Corinthians", chapter: "4-5" }
    },
    {
        day: 37,
        psalm: { book: "Psalm", chapter: "37" },
        gospel: { book: "Matthew", chapter: "16" },
        wisdom: { book: "Job", chapter: "39" },
        oldTestament: { book: "Exodus", chapter: "35-36" },
        newTestament: { book: "2 Corinthians", chapter: "6-7" }
    },
    {
        day: 38,
        psalm: { book: "Psalm", chapter: "38" },
        gospel: { book: "Matthew", chapter: "17" },
        wisdom: { book: "Job", chapter: "40-41" },
        oldTestament: { book: "Exodus", chapter: "37-38" },
        newTestament: { book: "2 Corinthians", chapter: "8" }
    },
    {
        day: 39,
        psalm: { book: "Psalm", chapter: "39" },
        gospel: { book: "Matthew", chapter: "18" },
        wisdom: { book: "Job", chapter: "42" },
        oldTestament: { book: "Exodus", chapter: "39-40" },
        newTestament: { book: "2 Corinthians", chapter: "9-10" }
    },
    {
        day: 40,
        psalm: { book: "Psalm", chapter: "40" },
        gospel: { book: "Matthew", chapter: "19" },
        wisdom: { book: "Proverbs", chapter: "1" },
        oldTestament: { book: "Leviticus", chapter: "1-4" },
        newTestament: { book: "2 Corinthians", chapter: "11" }
    },
    {
        day: 41,
        psalm: { book: "Psalm", chapter: "41" },
        gospel: { book: "Matthew", chapter: "20" },
        wisdom: { book: "Proverbs", chapter: "2" },
        oldTestament: { book: "Leviticus", chapter: "5-7" },
        newTestament: { book: "2 Corinthians", chapter: "12-13" }
    },
    {
        day: 42,
        psalm: { book: "Psalm", chapter: "42" },
        gospel: { book: "Matthew", chapter: "21" },
        wisdom: { book: "Proverbs", chapter: "3" },
        oldTestament: { book: "Leviticus", chapter: "8-9" },
        newTestament: { book: "Galatians", chapter: "1" }
    },
    {
        day: 43,
        psalm: { book: "Psalm", chapter: "43" },
        gospel: { book: "Matthew", chapter: "22" },
        wisdom: { book: "Proverbs", chapter: "4" },
        oldTestament: { book: "Leviticus", chapter: "10-11" },
        newTestament: { book: "Galatians", chapter: "2" }
    },
    {
        day: 44,
        psalm: { book: "Psalm", chapter: "44" },
        gospel: { book: "Matthew", chapter: "23" },
        wisdom: { book: "Proverbs", chapter: "5" },
        oldTestament: { book: "Leviticus", chapter: "12-13" },
        newTestament: { book: "Galatians", chapter: "3" }
    },
    {
        day: 45,
        psalm: { book: "Psalm", chapter: "45" },
        gospel: { book: "Matthew", chapter: "24" },
        wisdom: { book: "Proverbs", chapter: "6" },
        oldTestament: { book: "Leviticus", chapter: "14" },
        newTestament: { book: "Galatians", chapter: "4" }
    },
    {
        day: 46,
        psalm: { book: "Psalm", chapter: "46" },
        gospel: { book: "Matthew", chapter: "25" },
        wisdom: { book: "Proverbs", chapter: "7" },
        oldTestament: { book: "Leviticus", chapter: "15-16" },
        newTestament: { book: "Galatians", chapter: "5" }
    },
    {
        day: 47,
        psalm: { book: "Psalm", chapter: "47" },
        gospel: { book: "Matthew", chapter: "26" },
        wisdom: { book: "Proverbs", chapter: "8" },
        oldTestament: { book: "Leviticus", chapter: "17-19" },
        newTestament: { book: "Galatians", chapter: "6" }
    },
    {
        day: 48,
        psalm: { book: "Psalm", chapter: "48" },
        gospel: { book: "Matthew", chapter: "27" },
        wisdom: { book: "Proverbs", chapter: "9" },
        oldTestament: { book: "Leviticus", chapter: "20-21" },
        newTestament: { book: "Ephesians", chapter: "1" }
    },
    {
        day: 49,
        psalm: { book: "Psalm", chapter: "49" },
        gospel: { book: "Matthew", chapter: "28" },
        wisdom: { book: "Proverbs", chapter: "10" },
        oldTestament: { book: "Leviticus", chapter: "22-23" },
        newTestament: { book: "Ephesians", chapter: "2" }
    },
    {
        day: 50,
        psalm: { book: "Psalm", chapter: "50" },
        gospel: { book: "Mark", chapter: "1" },
        wisdom: { book: "Proverbs", chapter: "11" },
        oldTestament: { book: "Leviticus", chapter: "24-25" },
        newTestament: { book: "Ephesians", chapter: "3" }
    },
    {
        day: 51,
        psalm: { book: "Psalm", chapter: "51" },
        gospel: { book: "Mark", chapter: "2" },
        wisdom: { book: "Proverbs", chapter: "12" },
        oldTestament: { book: "Leviticus", chapter: "26-27" },
        newTestament: { book: "Ephesians", chapter: "4" }
    },
    {
        day: 52,
        psalm: { book: "Psalm", chapter: "52" },
        gospel: { book: "Mark", chapter: "3" },
        wisdom: { book: "Proverbs", chapter: "13" },
        oldTestament: { book: "Numbers", chapter: "1" },
        newTestament: { book: "Ephesians", chapter: "5" }
    },
    {
        day: 53,
        psalm: { book: "Psalm", chapter: "53" },
        gospel: { book: "Mark", chapter: "4" },
        wisdom: { book: "Proverbs", chapter: "14" },
        oldTestament: { book: "Numbers", chapter: "2-3" },
        newTestament: { book: "Ephesians", chapter: "6" }
    },
    {
        day: 54,
        psalm: { book: "Psalm", chapter: "54" },
        gospel: { book: "Mark", chapter: "5" },
        wisdom: { book: "Proverbs", chapter: "15" },
        oldTestament: { book: "Numbers", chapter: "4" },
        newTestament: { book: "Philippians", chapter: "1" }
    },
    {
        day: 55,
        psalm: { book: "Psalm", chapter: "55" },
        gospel: { book: "Mark", chapter: "6" },
        wisdom: { book: "Proverbs", chapter: "16" },
        oldTestament: { book: "Numbers", chapter: "5-6" },
        newTestament: { book: "Philippians", chapter: "2" }
    },
    {
        day: 56,
        psalm: { book: "Psalm", chapter: "56" },
        gospel: { book: "Mark", chapter: "7" },
        wisdom: { book: "Proverbs", chapter: "17" },
        oldTestament: { book: "Numbers", chapter: "7" },
        newTestament: { book: "Philippians", chapter: "3" }
    },
    {
        day: 57,
        psalm: { book: "Psalm", chapter: "57" },
        gospel: { book: "Mark", chapter: "8" },
        wisdom: { book: "Proverbs", chapter: "18" },
        oldTestament: { book: "Numbers", chapter: "8-10" },
        newTestament: { book: "Philippians", chapter: "4" }
    },
    {
        day: 58,
        psalm: { book: "Psalm", chapter: "58" },
        gospel: { book: "Mark", chapter: "9" },
        wisdom: { book: "Proverbs", chapter: "19" },
        oldTestament: { book: "Numbers", chapter: "11-13" },
        newTestament: { book: "Colossians", chapter: "1" }
    },
    {
        day: 59,
        psalm: { book: "Psalm", chapter: "59" },
        gospel: { book: "Mark", chapter: "10" },
        wisdom: { book: "Proverbs", chapter: "20" },
        oldTestament: { book: "Numbers", chapter: "14-15" },
        newTestament: { book: "Colossians", chapter: "2" }
    },
    {
        day: 60,
        psalm: { book: "Psalm", chapter: "60" },
        gospel: { book: "Mark", chapter: "11" },
        wisdom: { book: "Proverbs", chapter: "21" },
        oldTestament: { book: "Numbers", chapter: "16-17" },
        newTestament: { book: "Colossians", chapter: "3-4" }
    },
    {
        day: 61,
        psalm: { book: "Psalm", chapter: "61" },
        gospel: { book: "Mark", chapter: "12" },
        wisdom: { book: "Proverbs", chapter: "22" },
        oldTestament: { book: "Numbers", chapter: "18-20" },
        newTestament: { book: "1 Thessalonians", chapter: "1-3" }
    },
    {
        day: 62,
        psalm: { book: "Psalm", chapter: "62" },
        gospel: { book: "Mark", chapter: "13" },
        wisdom: { book: "Proverbs", chapter: "23" },
        oldTestament: { book: "Numbers", chapter: "21-22" },
        newTestament: { book: "1 Thessalonians", chapter: "4-5" }
    },
    {
        day: 63,
        psalm: { book: "Psalm", chapter: "63" },
        gospel: { book: "Mark", chapter: "14" },
        wisdom: { book: "Proverbs", chapter: "24" },
        oldTestament: { book: "Numbers", chapter: "23-25" },
        newTestament: { book: "2 Thessalonians", chapter: "1-3" }
    },
    {
        day: 64,
        psalm: { book: "Psalm", chapter: "64" },
        gospel: { book: "Mark", chapter: "15" },
        wisdom: { book: "Proverbs", chapter: "25" },
        oldTestament: { book: "Numbers", chapter: "26-27" },
        newTestament: { book: "1 Timothy", chapter: "1-2" }
    },
    {
        day: 65,
        psalm: { book: "Psalm", chapter: "65" },
        gospel: { book: "Mark", chapter: "16" },
        wisdom: { book: "Proverbs", chapter: "26" },
        oldTestament: { book: "Numbers", chapter: "28-29" },
        newTestament: { book: "1 Timothy", chapter: "3-4" }
    },
    {
        day: 66,
        psalm: { book: "Psalm", chapter: "66" },
        gospel: { book: "Luke", chapter: "1" },
        wisdom: { book: "Proverbs", chapter: "27" },
        oldTestament: { book: "Numbers", chapter: "30-31" },
        newTestament: { book: "1 Timothy", chapter: "5" }
    },
    {
        day: 67,
        psalm: { book: "Psalm", chapter: "67" },
        gospel: { book: "Luke", chapter: "2" },
        wisdom: { book: "Proverbs", chapter: "28" },
        oldTestament: { book: "Numbers", chapter: "32" },
        newTestament: { book: "1 Timothy", chapter: "6" }
    },
    {
        day: 68,
        psalm: { book: "Psalm", chapter: "68" },
        gospel: { book: "Luke", chapter: "3" },
        wisdom: { book: "Proverbs", chapter: "29" },
        oldTestament: { book: "Numbers", chapter: "33" },
        newTestament: { book: "2 Timothy", chapter: "1-2" }
    },
    {
        day: 69,
        psalm: { book: "Psalm", chapter: "69" },
        gospel: { book: "Luke", chapter: "4" },
        wisdom: { book: "Proverbs", chapter: "30" },
        oldTestament: { book: "Numbers", chapter: "34-36" },
        newTestament: { book: "2 Timothy", chapter: "3-4" }
    },
    {
        day: 70,
        psalm: { book: "Psalm", chapter: "70" },
        gospel: { book: "Luke", chapter: "5" },
        wisdom: { book: "Proverbs", chapter: "31" },
        oldTestament: { book: "Deuteronomy", chapter: "1-2" },
        newTestament: { book: "Titus", chapter: "1-3" }
    },
    {
        day: 71,
        psalm: { book: "Psalm", chapter: "71" },
        gospel: { book: "Luke", chapter: "6" },
        wisdom: { book: "Ecclesiastes", chapter: "1-2" },
        oldTestament: { book: "Deuteronomy", chapter: "3-4" },
        newTestament: { book: "Philemon", chapter: "1" }
    },
    {
        day: 72,
        psalm: { book: "Psalm", chapter: "72" },
        gospel: { book: "Luke", chapter: "7" },
        wisdom: { book: "Ecclesiastes", chapter: "3-4" },
        oldTestament: { book: "Deuteronomy", chapter: "5-7" },
        newTestament: { book: "Hebrews", chapter: "1-2" }
    },
    {
        day: 73,
        psalm: { book: "Psalm", chapter: "73" },
        gospel: { book: "Luke", chapter: "8" },
        wisdom: { book: "Ecclesiastes", chapter: "5-6" },
        oldTestament: { book: "Deuteronomy", chapter: "8-10" },
        newTestament: { book: "Hebrews", chapter: "3" }
    },
    {
        day: 74,
        psalm: { book: "Psalm", chapter: "74" },
        gospel: { book: "Luke", chapter: "9" },
        wisdom: { book: "Ecclesiastes", chapter: "7-8" },
        oldTestament: { book: "Deuteronomy", chapter: "11-12" },
        newTestament: { book: "Hebrews", chapter: "4-5" }
    },
    {
        day: 75,
        psalm: { book: "Psalm", chapter: "75" },
        gospel: { book: "Luke", chapter: "10" },
        wisdom: { book: "Ecclesiastes", chapter: "9-10" },
        oldTestament: { book: "Deuteronomy", chapter: "13-15" },
        newTestament: { book: "Hebrews", chapter: "6" }
    },
    {
        day: 76,
        psalm: { book: "Psalm", chapter: "76" },
        gospel: { book: "Luke", chapter: "11" },
        wisdom: { book: "Ecclesiastes", chapter: "11-12" },
        oldTestament: { book: "Deuteronomy", chapter: "16-18" },
        newTestament: { book: "Hebrews", chapter: "7" }
    },
    {
        day: 77,
        psalm: { book: "Psalm", chapter: "77" },
        gospel: { book: "Luke", chapter: "12" },
        wisdom: { book: "Song of Solomon", chapter: "1-2" },
        oldTestament: { book: "Deuteronomy", chapter: "19-21" },
        newTestament: { book: "Hebrews", chapter: "8" }
    },
    {
        day: 78,
        psalm: { book: "Psalm", chapter: "78" },
        gospel: { book: "Luke", chapter: "13" },
        wisdom: { book: "Song of Solomon", chapter: "3-4" },
        oldTestament: { book: "Deuteronomy", chapter: "22-24" },
        newTestament: { book: "Hebrews", chapter: "9" }
    },
    {
        day: 79,
        psalm: { book: "Psalm", chapter: "79" },
        gospel: { book: "Luke", chapter: "14" },
        wisdom: { book: "Song of Solomon", chapter: "5-6" },
        oldTestament: { book: "Deuteronomy", chapter: "25-27" },
        newTestament: { book: "Hebrews", chapter: "10" }
    },
    {
        day: 80,
        psalm: { book: "Psalm", chapter: "80" },
        gospel: { book: "Luke", chapter: "15" },
        wisdom: { book: "Song of Solomon", chapter: "7-8" },
        oldTestament: { book: "Deuteronomy", chapter: "28" },
        newTestament: { book: "Hebrews", chapter: "11" }
    },
    {
        day: 81,
        psalm: { book: "Psalm", chapter: "81" },
        gospel: { book: "Luke", chapter: "16" },
        wisdom: { book: "Wisdom of Solomon", chapter: "1" },
        oldTestament: { book: "Deuteronomy", chapter: "29-30" },
        newTestament: { book: "Hebrews", chapter: "12" }
    },
    {
        day: 82,
        psalm: { book: "Psalm", chapter: "82" },
        gospel: { book: "Luke", chapter: "17" },
        wisdom: { book: "Wisdom of Solomon", chapter: "2" },
        oldTestament: { book: "Deuteronomy", chapter: "31-32" },
        newTestament: { book: "Hebrews", chapter: "13" }
    },
    {
        day: 83,
        psalm: { book: "Psalm", chapter: "83" },
        gospel: { book: "Luke", chapter: "18" },
        wisdom: { book: "Wisdom of Solomon", chapter: "3" },
        oldTestament: { book: "Deuteronomy", chapter: "33-34" },
        newTestament: { book: "James", chapter: "1" }
    },
    {
        day: 84,
        psalm: { book: "Psalm", chapter: "84" },
        gospel: { book: "Luke", chapter: "19" },
        wisdom: { book: "Wisdom of Solomon", chapter: "4" },
        oldTestament: { book: "Joshua", chapter: "1-4" },
        newTestament: { book: "James", chapter: "2" }
    },
    {
        day: 85,
        psalm: { book: "Psalm", chapter: "85" },
        gospel: { book: "Luke", chapter: "20" },
        wisdom: { book: "Wisdom of Solomon", chapter: "5" },
        oldTestament: { book: "Joshua", chapter: "5-7" },
        newTestament: { book: "James", chapter: "3" }
    },
    {
        day: 86,
        psalm: { book: "Psalm", chapter: "86" },
        gospel: { book: "Luke", chapter: "21" },
        wisdom: { book: "Wisdom of Solomon", chapter: "6" },
        oldTestament: { book: "Joshua", chapter: "8-9" },
        newTestament: { book: "James", chapter: "4" }
    },
    {
        day: 87,
        psalm: { book: "Psalm", chapter: "87" },
        gospel: { book: "Luke", chapter: "22" },
        wisdom: { book: "Wisdom of Solomon", chapter: "7" },
        oldTestament: { book: "Joshua", chapter: "10-11" },
        newTestament: { book: "James", chapter: "5" }
    },
    {
        day: 88,
        psalm: { book: "Psalm", chapter: "88" },
        gospel: { book: "Luke", chapter: "23" },
        wisdom: { book: "Wisdom of Solomon", chapter: "8" },
        oldTestament: { book: "Joshua", chapter: "12-14" },
        newTestament: { book: "1 Peter", chapter: "1" }
    },
    {
        day: 89,
        psalm: { book: "Psalm", chapter: "89" },
        gospel: { book: "Luke", chapter: "24" },
        wisdom: { book: "Wisdom of Solomon", chapter: "9" },
        oldTestament: { book: "Joshua", chapter: "15-17" },
        newTestament: { book: "1 Peter", chapter: "2" }
    },
    {
        day: 90,
        psalm: { book: "Psalm", chapter: "90" },
        gospel: { book: "Acts", chapter: "1" },
        wisdom: { book: "Wisdom of Solomon", chapter: "10" },
        oldTestament: { book: "Joshua", chapter: "18-19" },
        newTestament: { book: "1 Peter", chapter: "3" }
    },
    {
        day: 91,
        psalm: { book: "Psalm", chapter: "91" },
        gospel: { book: "Acts", chapter: "2" },
        wisdom: { book: "Wisdom of Solomon", chapter: "11" },
        oldTestament: { book: "Joshua", chapter: "20-21" },
        newTestament: { book: "1 Peter", chapter: "4" }
    },
    {
        day: 92,
        psalm: { book: "Psalm", chapter: "92" },
        gospel: { book: "Acts", chapter: "3" },
        wisdom: { book: "Wisdom of Solomon", chapter: "12" },
        oldTestament: { book: "Joshua", chapter: "22-24" },
        newTestament: { book: "1 Peter", chapter: "5" }
    },
    {
        day: 93,
        psalm: { book: "Psalm", chapter: "93" },
        gospel: { book: "Acts", chapter: "4" },
        wisdom: { book: "Wisdom of Solomon", chapter: "13" },
        oldTestament: { book: "Judges", chapter: "1-2" },
        newTestament: { book: "2 Peter", chapter: "1-3" }
    },
    {
        day: 94,
        psalm: { book: "Psalm", chapter: "94" },
        gospel: { book: "Acts", chapter: "5" },
        wisdom: { book: "Wisdom of Solomon", chapter: "14" },
        oldTestament: { book: "Judges", chapter: "3-4" },
        newTestament: { book: "1 John", chapter: "1-2" }
    },
    {
        day: 95,
        psalm: { book: "Psalm", chapter: "95" },
        gospel: { book: "Acts", chapter: "6" },
        wisdom: { book: "Wisdom of Solomon", chapter: "15" },
        oldTestament: { book: "Judges", chapter: "5-6" },
        newTestament: { book: "1 John", chapter: "3" }
    },
    {
        day: 96,
        psalm: { book: "Psalm", chapter: "96" },
        gospel: { book: "Acts", chapter: "7" },
        wisdom: { book: "Wisdom of Solomon", chapter: "16" },
        oldTestament: { book: "Judges", chapter: "7-8" },
        newTestament: { book: "1 John", chapter: "4" }
    },
    {
        day: 97,
        psalm: { book: "Psalm", chapter: "97" },
        gospel: { book: "Acts", chapter: "8" },
        wisdom: { book: "Wisdom of Solomon", chapter: "17" },
        oldTestament: { book: "Judges", chapter: "9-10" },
        newTestament: { book: "1 John", chapter: "5" }
    },
    {
        day: 98,
        psalm: { book: "Psalm", chapter: "98" },
        gospel: { book: "Acts", chapter: "9" },
        wisdom: { book: "Wisdom of Solomon", chapter: "18" },
        oldTestament: { book: "Judges", chapter: "11-13" },
        newTestament: { book: "2 John", chapter: "1" }
    },
    {
        day: 99,
        psalm: { book: "Psalm", chapter: "99" },
        gospel: { book: "Acts", chapter: "10" },
        wisdom: { book: "Wisdom of Solomon", chapter: "19" },
        oldTestament: { book: "Judges", chapter: "14-16" },
        newTestament: { book: "3 John", chapter: "1" }
    },
    {
        day: 100,
        psalm: { book: "Psalm", chapter: "100" },
        gospel: { book: "Acts", chapter: "11" },
        wisdom: { book: "Sirach", chapter: "1" },
        oldTestament: { book: "Judges", chapter: "17-19" },
        newTestament: { book: "Jude", chapter: "1" }
    },
    {
        day: 101,
        psalm: { book: "Psalm", chapter: "101" },
        gospel: { book: "Acts", chapter: "12" },
        wisdom: { book: "Sirach", chapter: "2" },
        oldTestament: { book: "Judges", chapter: "20-21" },
        newTestament: { book: "Romans", chapter: "1" }
    },
    {
        day: 102,
        psalm: { book: "Psalm", chapter: "102" },
        gospel: { book: "Acts", chapter: "13" },
        wisdom: { book: "Sirach", chapter: "3" },
        oldTestament: { book: "Ruth", chapter: "1-4" },
        newTestament: { book: "Romans", chapter: "2" }
    },
    {
        day: 103,
        psalm: { book: "Psalm", chapter: "103" },
        gospel: { book: "Acts", chapter: "14" },
        wisdom: { book: "Sirach", chapter: "4" },
        oldTestament: { book: "1 Samuel", chapter: "1-2" },
        newTestament: { book: "Romans", chapter: "3" }
    },
    {
        day: 104,
        psalm: { book: "Psalm", chapter: "104" },
        gospel: { book: "Acts", chapter: "15" },
        wisdom: { book: "Sirach", chapter: "5" },
        oldTestament: { book: "1 Samuel", chapter: "3-6" },
        newTestament: { book: "Romans", chapter: "4" }
    },
    {
        day: 105,
        psalm: { book: "Psalm", chapter: "105" },
        gospel: { book: "Acts", chapter: "16" },
        wisdom: { book: "Sirach", chapter: "6" },
        oldTestament: { book: "1 Samuel", chapter: "7-9" },
        newTestament: { book: "Romans", chapter: "5" }
    },
    {
        day: 106,
        psalm: { book: "Psalm", chapter: "106" },
        gospel: { book: "Acts", chapter: "17" },
        wisdom: { book: "Sirach", chapter: "7" },
        oldTestament: { book: "1 Samuel", chapter: "10-12" },
        newTestament: { book: "Romans", chapter: "6" }
    },
    {
        day: 107,
        psalm: { book: "Psalm", chapter: "107" },
        gospel: { book: "Acts", chapter: "18" },
        wisdom: { book: "Sirach", chapter: "8" },
        oldTestament: { book: "1 Samuel", chapter: "13-14" },
        newTestament: { book: "Romans", chapter: "7" }
    },
    {
        day: 108,
        psalm: { book: "Psalm", chapter: "108" },
        gospel: { book: "Acts", chapter: "19" },
        wisdom: { book: "Sirach", chapter: "9" },
        oldTestament: { book: "1 Samuel", chapter: "15-16" },
        newTestament: { book: "Romans", chapter: "8" }
    },
    {
        day: 109,
        psalm: { book: "Psalm", chapter: "109" },
        gospel: { book: "Acts", chapter: "20" },
        wisdom: { book: "Sirach", chapter: "10" },
        oldTestament: { book: "1 Samuel", chapter: "17" },
        newTestament: { book: "Romans", chapter: "9" }
    },
    {
        day: 110,
        psalm: { book: "Psalm", chapter: "110" },
        gospel: { book: "Acts", chapter: "21" },
        wisdom: { book: "Sirach", chapter: "11" },
        oldTestament: { book: "1 Samuel", chapter: "18-19" },
        newTestament: { book: "Romans", chapter: "10" }
    },
    {
        day: 111,
        psalm: { book: "Psalm", chapter: "111" },
        gospel: { book: "Acts", chapter: "22" },
        wisdom: { book: "Sirach", chapter: "12" },
        oldTestament: { book: "1 Samuel", chapter: "20-21" },
        newTestament: { book: "Romans", chapter: "11" }
    },
    {
        day: 112,
        psalm: { book: "Psalm", chapter: "112" },
        gospel: { book: "Acts", chapter: "23" },
        wisdom: { book: "Sirach", chapter: "13" },
        oldTestament: { book: "1 Samuel", chapter: "22-24" },
        newTestament: { book: "Romans", chapter: "12" }
    },
    {
        day: 113,
        psalm: { book: "Psalm", chapter: "113" },
        gospel: { book: "Acts", chapter: "24" },
        wisdom: { book: "Sirach", chapter: "14" },
        oldTestament: { book: "1 Samuel", chapter: "25-27" },
        newTestament: { book: "Romans", chapter: "13" }
    },
    {
        day: 114,
        psalm: { book: "Psalm", chapter: "114" },
        gospel: { book: "Acts", chapter: "25" },
        wisdom: { book: "Sirach", chapter: "15" },
        oldTestament: { book: "1 Samuel", chapter: "28-31" },
        newTestament: { book: "Romans", chapter: "14" }
    },
    {
        day: 115,
        psalm: { book: "Psalm", chapter: "115" },
        gospel: { book: "Acts", chapter: "26" },
        wisdom: { book: "Sirach", chapter: "16" },
        oldTestament: { book: "2 Samuel", chapter: "1-2" },
        newTestament: { book: "Romans", chapter: "15" }
    },
    {
        day: 116,
        psalm: { book: "Psalm", chapter: "116" },
        gospel: { book: "Acts", chapter: "27" },
        wisdom: { book: "Sirach", chapter: "17" },
        oldTestament: { book: "2 Samuel", chapter: "3-5" },
        newTestament: { book: "Romans", chapter: "16" }
    },
    {
        day: 117,
        psalm: { book: "Psalm", chapter: "117" },
        gospel: { book: "Acts", chapter: "28" },
        wisdom: { book: "Sirach", chapter: "18" },
        oldTestament: { book: "2 Samuel", chapter: "6-9" },
        newTestament: { book: "1 Corinthians", chapter: "1" }
    },
    {
        day: 118,
        psalm: { book: "Psalm", chapter: "118" },
        gospel: { book: "Revelation", chapter: "1" },
        wisdom: { book: "Sirach", chapter: "19" },
        oldTestament: { book: "2 Samuel", chapter: "10-12" },
        newTestament: { book: "1 Corinthians", chapter: "2" }
    },
    {
        day: 119,
        psalm: { book: "Psalm", chapter: "119" },
        gospel: { book: "Revelation", chapter: "2" },
        wisdom: { book: "Sirach", chapter: "20" },
        oldTestament: { book: "2 Samuel", chapter: "13-14" },
        newTestament: { book: "1 Corinthians", chapter: "3" }
    },
    {
        day: 120,
        psalm: { book: "Psalm", chapter: "120" },
        gospel: { book: "Revelation", chapter: "3" },
        wisdom: { book: "Sirach", chapter: "21" },
        oldTestament: { book: "2 Samuel", chapter: "15-16" },
        newTestament: { book: "1 Corinthians", chapter: "4" }
    },
    {
        day: 121,
        psalm: { book: "Psalm", chapter: "121" },
        gospel: { book: "Revelation", chapter: "4" },
        wisdom: { book: "Sirach", chapter: "22" },
        oldTestament: { book: "2 Samuel", chapter: "17-18" },
        newTestament: { book: "1 Corinthians", chapter: "5" }
    },
    {
        day: 122,
        psalm: { book: "Psalm", chapter: "122" },
        gospel: { book: "Revelation", chapter: "5" },
        wisdom: { book: "Sirach", chapter: "23" },
        oldTestament: { book: "2 Samuel", chapter: "19-20" },
        newTestament: { book: "1 Corinthians", chapter: "6" }
    },
    {
        day: 123,
        psalm: { book: "Psalm", chapter: "123" },
        gospel: { book: "Revelation", chapter: "6" },
        wisdom: { book: "Sirach", chapter: "24" },
        oldTestament: { book: "2 Samuel", chapter: "21-22" },
        newTestament: { book: "1 Corinthians", chapter: "7" }
    },
    {
        day: 124,
        psalm: { book: "Psalm", chapter: "124" },
        gospel: { book: "Revelation", chapter: "7" },
        wisdom: { book: "Sirach", chapter: "25" },
        oldTestament: { book: "2 Samuel", chapter: "23-24" },
        newTestament: { book: "1 Corinthians", chapter: "8" }
    },
    {
        day: 125,
        psalm: { book: "Psalm", chapter: "125" },
        gospel: { book: "Revelation", chapter: "8" },
        wisdom: { book: "Sirach", chapter: "26" },
        oldTestament: { book: "1 Kings", chapter: "1" },
        newTestament: { book: "1 Corinthians", chapter: "9" }
    },
    {
        day: 126,
        psalm: { book: "Psalm", chapter: "126" },
        gospel: { book: "Revelation", chapter: "9" },
        wisdom: { book: "Sirach", chapter: "27" },
        oldTestament: { book: "1 Kings", chapter: "2-3" },
        newTestament: { book: "1 Corinthians", chapter: "10" }
    },
    {
        day: 127,
        psalm: { book: "Psalm", chapter: "127" },
        gospel: { book: "Revelation", chapter: "10" },
        wisdom: { book: "Sirach", chapter: "28" },
        oldTestament: { book: "1 Kings", chapter: "4-5" },
        newTestament: { book: "1 Corinthians", chapter: "11" }
    },
    {
        day: 128,
        psalm: { book: "Psalm", chapter: "128" },
        gospel: { book: "Revelation", chapter: "11" },
        wisdom: { book: "Sirach", chapter: "29" },
        oldTestament: { book: "1 Kings", chapter: "6-7" },
        newTestament: { book: "1 Corinthians", chapter: "12" }
    },
    {
        day: 129,
        psalm: { book: "Psalm", chapter: "129" },
        gospel: { book: "Revelation", chapter: "12" },
        wisdom: { book: "Sirach", chapter: "30" },
        oldTestament: { book: "1 Kings", chapter: "8" },
        newTestament: { book: "1 Corinthians", chapter: "13" }
    },
    {
        day: 130,
        psalm: { book: "Psalm", chapter: "130" },
        gospel: { book: "Revelation", chapter: "13" },
        wisdom: { book: "Sirach", chapter: "31" },
        oldTestament: { book: "1 Kings", chapter: "9-10" },
        newTestament: { book: "1 Corinthians", chapter: "14" }
    },
    {
        day: 131,
        psalm: { book: "Psalm", chapter: "131" },
        gospel: { book: "Revelation", chapter: "14" },
        wisdom: { book: "Sirach", chapter: "32" },
        oldTestament: { book: "1 Kings", chapter: "11-12" },
        newTestament: { book: "1 Corinthians", chapter: "15" }
    },
    {
        day: 132,
        psalm: { book: "Psalm", chapter: "132" },
        gospel: { book: "Revelation", chapter: "15" },
        wisdom: { book: "Sirach", chapter: "33" },
        oldTestament: { book: "1 Kings", chapter: "13-14" },
        newTestament: { book: "1 Corinthians", chapter: "16" }
    },
    {
        day: 133,
        psalm: { book: "Psalm", chapter: "133" },
        gospel: { book: "Revelation", chapter: "16" },
        wisdom: { book: "Sirach", chapter: "34" },
        oldTestament: { book: "1 Kings", chapter: "15-16" },
        newTestament: { book: "2 Corinthians", chapter: "1" }
    },
    {
        day: 134,
        psalm: { book: "Psalm", chapter: "134" },
        gospel: { book: "Revelation", chapter: "17" },
        wisdom: { book: "Sirach", chapter: "35" },
        oldTestament: { book: "1 Kings", chapter: "17-18" },
        newTestament: { book: "2 Corinthians", chapter: "2" }
    },
    {
        day: 135,
        psalm: { book: "Psalm", chapter: "135" },
        gospel: { book: "Revelation", chapter: "18" },
        wisdom: { book: "Sirach", chapter: "36" },
        oldTestament: { book: "1 Kings", chapter: "19-20" },
        newTestament: { book: "2 Corinthians", chapter: "3" }
    },
    {
        day: 136,
        psalm: { book: "Psalm", chapter: "136" },
        gospel: { book: "Revelation", chapter: "19" },
        wisdom: { book: "Sirach", chapter: "37" },
        oldTestament: { book: "1 Kings", chapter: "21-22" },
        newTestament: { book: "2 Corinthians", chapter: "4-5" }
    },
    {
        day: 137,
        psalm: { book: "Psalm", chapter: "137" },
        gospel: { book: "Revelation", chapter: "20" },
        wisdom: { book: "Sirach", chapter: "38" },
        oldTestament: { book: "2 Kings", chapter: "1-3" },
        newTestament: { book: "2 Corinthians", chapter: "6-7" }
    },
    {
        day: 138,
        psalm: { book: "Psalm", chapter: "138" },
        gospel: { book: "Revelation", chapter: "21" },
        wisdom: { book: "Sirach", chapter: "39" },
        oldTestament: { book: "2 Kings", chapter: "4-5" },
        newTestament: { book: "2 Corinthians", chapter: "8" }
    },
    {
        day: 139,
        psalm: { book: "Psalm", chapter: "139" },
        gospel: { book: "Revelation", chapter: "22" },
        wisdom: { book: "Sirach", chapter: "40" },
        oldTestament: { book: "2 Kings", chapter: "6-8" },
        newTestament: { book: "2 Corinthians", chapter: "9-10" }
    },
    {
        day: 140,
        psalm: { book: "Psalm", chapter: "140" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "41" },
        oldTestament: { book: "2 Kings", chapter: "9-10" },
        newTestament: { book: "2 Corinthians", chapter: "11" }
    },
    {
        day: 141,
        psalm: { book: "Psalm", chapter: "141" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "42" },
        oldTestament: { book: "2 Kings", chapter: "11-13" },
        newTestament: { book: "2 Corinthians", chapter: "12-13" }
    },
    {
        day: 142,
        psalm: { book: "Psalm", chapter: "142" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "43" },
        oldTestament: { book: "2 Kings", chapter: "14-15" },
        newTestament: { book: "Galatians", chapter: "1" }
    },
    {
        day: 143,
        psalm: { book: "Psalm", chapter: "143" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "44" },
        oldTestament: { book: "2 Kings", chapter: "16-17" },
        newTestament: { book: "Galatians", chapter: "2" }
    },
    {
        day: 144,
        psalm: { book: "Psalm", chapter: "144" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "45" },
        oldTestament: { book: "2 Kings", chapter: "18-19" },
        newTestament: { book: "Galatians", chapter: "3" }
    },
    {
        day: 145,
        psalm: { book: "Psalm", chapter: "145" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "46" },
        oldTestament: { book: "2 Kings", chapter: "20-22" },
        newTestament: { book: "Galatians", chapter: "4" }
    },
    {
        day: 146,
        psalm: { book: "Psalm", chapter: "146" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "47" },
        oldTestament: { book: "2 Kings", chapter: "23-25" },
        newTestament: { book: "Galatians", chapter: "5" }
    },
    {
        day: 147,
        psalm: { book: "Psalm", chapter: "147" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "48" },
        oldTestament: { book: "Hosea", chapter: "1-4" },
        newTestament: { book: "Galatians", chapter: "6" }
    },
    {
        day: 148,
        psalm: { book: "Psalm", chapter: "148" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "49" },
        oldTestament: { book: "Hosea", chapter: "5-9" },
        newTestament: { book: "Ephesians", chapter: "1" }
    },
    {
        day: 149,
        psalm: { book: "Psalm", chapter: "149" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "50" },
        oldTestament: { book: "Hosea", chapter: "10-14" },
        newTestament: { book: "Ephesians", chapter: "2" }
    },
    {
        day: 150,
        psalm: { book: "Psalm", chapter: "150" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "51" },
        oldTestament: { book: "Amos", chapter: "1-5" },
        newTestament: { book: "Ephesians", chapter: "3" }
    },
    {
        day: 151,
        psalm: { book: "Psalm", chapter: "1" },
        gospel: { book: "John", chapter: "1" },
        wisdom: { book: "Job", chapter: "1-2" },
        oldTestament: { book: "Amos", chapter: "6-9" },
        newTestament: { book: "Ephesians", chapter: "4" }
    },
    {
        day: 152,
        psalm: { book: "Psalm", chapter: "2" },
        gospel: { book: "John", chapter: "2" },
        wisdom: { book: "Job", chapter: "3" },
        oldTestament: { book: "Isaiah", chapter: "1-2" },
        newTestament: { book: "Ephesians", chapter: "5" }
    },
    {
        day: 153,
        psalm: { book: "Psalm", chapter: "3" },
        gospel: { book: "John", chapter: "3" },
        wisdom: { book: "Job", chapter: "4" },
        oldTestament: { book: "Isaiah", chapter: "3-6" },
        newTestament: { book: "Ephesians", chapter: "6" }
    },
    {
        day: 154,
        psalm: { book: "Psalm", chapter: "4" },
        gospel: { book: "John", chapter: "4" },
        wisdom: { book: "Job", chapter: "5" },
        oldTestament: { book: "Isaiah", chapter: "7-9" },
        newTestament: { book: "Philippians", chapter: "1" }
    },
    {
        day: 155,
        psalm: { book: "Psalm", chapter: "5" },
        gospel: { book: "John", chapter: "5" },
        wisdom: { book: "Job", chapter: "6" },
        oldTestament: { book: "Isaiah", chapter: "10-13" },
        newTestament: { book: "Philippians", chapter: "2" }
    },
    {
        day: 156,
        psalm: { book: "Psalm", chapter: "6" },
        gospel: { book: "John", chapter: "6" },
        wisdom: { book: "Job", chapter: "7" },
        oldTestament: { book: "Isaiah", chapter: "14-18" },
        newTestament: { book: "Philippians", chapter: "3" }
    },
    {
        day: 157,
        psalm: { book: "Psalm", chapter: "7" },
        gospel: { book: "John", chapter: "7" },
        wisdom: { book: "Job", chapter: "8" },
        oldTestament: { book: "Isaiah", chapter: "19-22" },
        newTestament: { book: "Philippians", chapter: "4" }
    },
    {
        day: 158,
        psalm: { book: "Psalm", chapter: "8" },
        gospel: { book: "John", chapter: "8" },
        wisdom: { book: "Job", chapter: "9" },
        oldTestament: { book: "Isaiah", chapter: "23-26" },
        newTestament: { book: "Colossians", chapter: "1" }
    },
    {
        day: 159,
        psalm: { book: "Psalm", chapter: "9" },
        gospel: { book: "John", chapter: "9" },
        wisdom: { book: "Job", chapter: "10" },
        oldTestament: { book: "Isaiah", chapter: "27-29" },
        newTestament: { book: "Colossians", chapter: "2" }
    },
    {
        day: 160,
        psalm: { book: "Psalm", chapter: "10" },
        gospel: { book: "John", chapter: "10" },
        wisdom: { book: "Job", chapter: "11" },
        oldTestament: { book: "Isaiah", chapter: "30-32" },
        newTestament: { book: "Colossians", chapter: "3-4" }
    },
    {
        day: 161,
        psalm: { book: "Psalm", chapter: "11" },
        gospel: { book: "John", chapter: "11" },
        wisdom: { book: "Job", chapter: "12" },
        oldTestament: { book: "Isaiah", chapter: "33-36" },
        newTestament: { book: "1 Thessalonians", chapter: "1-3" }
    },
    {
        day: 162,
        psalm: { book: "Psalm", chapter: "12" },
        gospel: { book: "John", chapter: "12" },
        wisdom: { book: "Job", chapter: "13" },
        oldTestament: { book: "Isaiah", chapter: "37-38" },
        newTestament: { book: "1 Thessalonians", chapter: "4-5" }
    },
    {
        day: 163,
        psalm: { book: "Psalm", chapter: "13" },
        gospel: { book: "John", chapter: "13" },
        wisdom: { book: "Job", chapter: "14" },
        oldTestament: { book: "Isaiah", chapter: "39-41" },
        newTestament: { book: "2 Thessalonians", chapter: "1-3" }
    },
    {
        day: 164,
        psalm: { book: "Psalm", chapter: "14" },
        gospel: { book: "John", chapter: "14" },
        wisdom: { book: "Job", chapter: "15" },
        oldTestament: { book: "Isaiah", chapter: "42-44" },
        newTestament: { book: "1 Timothy", chapter: "1-2" }
    },
    {
        day: 165,
        psalm: { book: "Psalm", chapter: "15" },
        gospel: { book: "John", chapter: "15" },
        wisdom: { book: "Job", chapter: "16" },
        oldTestament: { book: "Isaiah", chapter: "45-48" },
        newTestament: { book: "1 Timothy", chapter: "3-4" }
    },
    {
        day: 166,
        psalm: { book: "Psalm", chapter: "16" },
        gospel: { book: "John", chapter: "16" },
        wisdom: { book: "Job", chapter: "17" },
        oldTestament: { book: "Isaiah", chapter: "49-52" },
        newTestament: { book: "1 Timothy", chapter: "5" }
    },
    {
        day: 167,
        psalm: { book: "Psalm", chapter: "17" },
        gospel: { book: "John", chapter: "17" },
        wisdom: { book: "Job", chapter: "18" },
        oldTestament: { book: "Isaiah", chapter: "53-57" },
        newTestament: { book: "1 Timothy", chapter: "6" }
    },
    {
        day: 168,
        psalm: { book: "Psalm", chapter: "18" },
        gospel: { book: "John", chapter: "18" },
        wisdom: { book: "Job", chapter: "19" },
        oldTestament: { book: "Isaiah", chapter: "58-62" },
        newTestament: { book: "2 Timothy", chapter: "1-2" }
    },
    {
        day: 169,
        psalm: { book: "Psalm", chapter: "19" },
        gospel: { book: "John", chapter: "19" },
        wisdom: { book: "Job", chapter: "20" },
        oldTestament: { book: "Isaiah", chapter: "63-66" },
        newTestament: { book: "2 Timothy", chapter: "3-4" }
    },
    {
        day: 170,
        psalm: { book: "Psalm", chapter: "20" },
        gospel: { book: "John", chapter: "20" },
        wisdom: { book: "Job", chapter: "21" },
        oldTestament: { book: "Micah", chapter: "1-4" },
        newTestament: { book: "Titus", chapter: "1-3" }
    },
    {
        day: 171,
        psalm: { book: "Psalm", chapter: "21" },
        gospel: { book: "John", chapter: "21" },
        wisdom: { book: "Job", chapter: "22" },
        oldTestament: { book: "Micah", chapter: "5-7" },
        newTestament: { book: "Philemon", chapter: "1" }
    },
    {
        day: 172,
        psalm: { book: "Psalm", chapter: "22" },
        gospel: { book: "Matthew", chapter: "1" },
        wisdom: { book: "Job", chapter: "23" },
        oldTestament: { book: "Nahum", chapter: "1-3" },
        newTestament: { book: "Hebrews", chapter: "1-2" }
    },
    {
        day: 173,
        psalm: { book: "Psalm", chapter: "23" },
        gospel: { book: "Matthew", chapter: "2" },
        wisdom: { book: "Job", chapter: "24" },
        oldTestament: { book: "Zephaniah", chapter: "1-3" },
        newTestament: { book: "Hebrews", chapter: "3" }
    },
    {
        day: 174,
        psalm: { book: "Psalm", chapter: "24" },
        gospel: { book: "Matthew", chapter: "3" },
        wisdom: { book: "Job", chapter: "25-26" },
        oldTestament: { book: "Habakkuk", chapter: "1-3" },
        newTestament: { book: "Hebrews", chapter: "4-5" }
    },
    {
        day: 175,
        psalm: { book: "Psalm", chapter: "25" },
        gospel: { book: "Matthew", chapter: "4" },
        wisdom: { book: "Job", chapter: "27" },
        oldTestament: { book: "Jeremiah", chapter: "1-3" },
        newTestament: { book: "Hebrews", chapter: "6" }
    },
    {
        day: 176,
        psalm: { book: "Psalm", chapter: "26" },
        gospel: { book: "Matthew", chapter: "5" },
        wisdom: { book: "Job", chapter: "28" },
        oldTestament: { book: "Jeremiah", chapter: "4-5" },
        newTestament: { book: "Hebrews", chapter: "7" }
    },
    {
        day: 177,
        psalm: { book: "Psalm", chapter: "27" },
        gospel: { book: "Matthew", chapter: "6" },
        wisdom: { book: "Job", chapter: "29" },
        oldTestament: { book: "Jeremiah", chapter: "6-8" },
        newTestament: { book: "Hebrews", chapter: "8" }
    },
    {
        day: 178,
        psalm: { book: "Psalm", chapter: "28" },
        gospel: { book: "Matthew", chapter: "7" },
        wisdom: { book: "Job", chapter: "30" },
        oldTestament: { book: "Jeremiah", chapter: "9-11" },
        newTestament: { book: "Hebrews", chapter: "9" }
    },
    {
        day: 179,
        psalm: { book: "Psalm", chapter: "29" },
        gospel: { book: "Matthew", chapter: "8" },
        wisdom: { book: "Job", chapter: "31" },
        oldTestament: { book: "Jeremiah", chapter: "12-14" },
        newTestament: { book: "Hebrews", chapter: "10" }
    },
    {
        day: 180,
        psalm: { book: "Psalm", chapter: "30" },
        gospel: { book: "Matthew", chapter: "9" },
        wisdom: { book: "Job", chapter: "32" },
        oldTestament: { book: "Jeremiah", chapter: "15-17" },
        newTestament: { book: "Hebrews", chapter: "11" }
    },
    {
        day: 181,
        psalm: { book: "Psalm", chapter: "31" },
        gospel: { book: "Matthew", chapter: "10" },
        wisdom: { book: "Job", chapter: "33" },
        oldTestament: { book: "Jeremiah", chapter: "18-21" },
        newTestament: { book: "Hebrews", chapter: "12" }
    },
    {
        day: 182,
        psalm: { book: "Psalm", chapter: "32" },
        gospel: { book: "Matthew", chapter: "11" },
        wisdom: { book: "Job", chapter: "34" },
        oldTestament: { book: "Jeremiah", chapter: "22-24" },
        newTestament: { book: "Hebrews", chapter: "13" }
    },
    {
        day: 183,
        psalm: { book: "Psalm", chapter: "33" },
        gospel: { book: "Matthew", chapter: "12" },
        wisdom: { book: "Job", chapter: "35" },
        oldTestament: { book: "Jeremiah", chapter: "25-27" },
        newTestament: { book: "James", chapter: "1" }
    },
    {
        day: 184,
        psalm: { book: "Psalm", chapter: "34" },
        gospel: { book: "Matthew", chapter: "13" },
        wisdom: { book: "Job", chapter: "36" },
        oldTestament: { book: "Jeremiah", chapter: "28-30" },
        newTestament: { book: "James", chapter: "2" }
    },
    {
        day: 185,
        psalm: { book: "Psalm", chapter: "35" },
        gospel: { book: "Matthew", chapter: "14" },
        wisdom: { book: "Job", chapter: "37" },
        oldTestament: { book: "Jeremiah", chapter: "31-32" },
        newTestament: { book: "James", chapter: "3" }
    },
    {
        day: 186,
        psalm: { book: "Psalm", chapter: "36" },
        gospel: { book: "Matthew", chapter: "15" },
        wisdom: { book: "Job", chapter: "38" },
        oldTestament: { book: "Jeremiah", chapter: "33-34" },
        newTestament: { book: "James", chapter: "4" }
    },
    {
        day: 187,
        psalm: { book: "Psalm", chapter: "37" },
        gospel: { book: "Matthew", chapter: "16" },
        wisdom: { book: "Job", chapter: "39" },
        oldTestament: { book: "Jeremiah", chapter: "35-37" },
        newTestament: { book: "James", chapter: "5" }
    },
    {
        day: 188,
        psalm: { book: "Psalm", chapter: "38" },
        gospel: { book: "Matthew", chapter: "17" },
        wisdom: { book: "Job", chapter: "40-41" },
        oldTestament: { book: "Jeremiah", chapter: "38-41" },
        newTestament: { book: "1 Peter", chapter: "1" }
    },
    {
        day: 189,
        psalm: { book: "Psalm", chapter: "39" },
        gospel: { book: "Matthew", chapter: "18" },
        wisdom: { book: "Job", chapter: "42" },
        oldTestament: { book: "Jeremiah", chapter: "42-45" },
        newTestament: { book: "1 Peter", chapter: "2" }
    },
    {
        day: 190,
        psalm: { book: "Psalm", chapter: "40" },
        gospel: { book: "Matthew", chapter: "19" },
        wisdom: { book: "Proverbs", chapter: "1" },
        oldTestament: { book: "Jeremiah", chapter: "46-48" },
        newTestament: { book: "1 Peter", chapter: "3" }
    },
    {
        day: 191,
        psalm: { book: "Psalm", chapter: "41" },
        gospel: { book: "Matthew", chapter: "20" },
        wisdom: { book: "Proverbs", chapter: "2" },
        oldTestament: { book: "Jeremiah", chapter: "49-50" },
        newTestament: { book: "1 Peter", chapter: "4" }
    },
    {
        day: 192,
        psalm: { book: "Psalm", chapter: "42" },
        gospel: { book: "Matthew", chapter: "21" },
        wisdom: { book: "Proverbs", chapter: "3" },
        oldTestament: { book: "Jeremiah", chapter: "51" },
        newTestament: { book: "1 Peter", chapter: "5" }
    },
    {
        day: 193,
        psalm: { book: "Psalm", chapter: "43" },
        gospel: { book: "Matthew", chapter: "22" },
        wisdom: { book: "Proverbs", chapter: "4" },
        oldTestament: { book: "Jeremiah", chapter: "52" },
        newTestament: { book: "2 Peter", chapter: "1-3" }
    },
    {
        day: 194,
        psalm: { book: "Psalm", chapter: "44" },
        gospel: { book: "Matthew", chapter: "23" },
        wisdom: { book: "Proverbs", chapter: "5" },
        oldTestament: { book: "Lamentations", chapter: "1-3" },
        newTestament: { book: "1 John", chapter: "1-2" }
    },
    {
        day: 195,
        psalm: { book: "Psalm", chapter: "45" },
        gospel: { book: "Matthew", chapter: "24" },
        wisdom: { book: "Proverbs", chapter: "6" },
        oldTestament: { book: "Lamentations", chapter: "4-5" },
        newTestament: { book: "1 John", chapter: "3" }
    },
    {
        day: 196,
        psalm: { book: "Psalm", chapter: "46" },
        gospel: { book: "Matthew", chapter: "25" },
        wisdom: { book: "Proverbs", chapter: "7" },
        oldTestament: { book: "Baruch", chapter: "1-2" },
        newTestament: { book: "1 John", chapter: "4" }
    },
    {
        day: 197,
        psalm: { book: "Psalm", chapter: "47" },
        gospel: { book: "Matthew", chapter: "26" },
        wisdom: { book: "Proverbs", chapter: "8" },
        oldTestament: { book: "Baruch", chapter: "3-4" },
        newTestament: { book: "1 John", chapter: "5" }
    },
    {
        day: 198,
        psalm: { book: "Psalm", chapter: "48" },
        gospel: { book: "Matthew", chapter: "27" },
        wisdom: { book: "Proverbs", chapter: "9" },
        oldTestament: { book: "Baruch", chapter: "5-6" },
        newTestament: { book: "2 John", chapter: "1" }
    },
    {
        day: 199,
        psalm: { book: "Psalm", chapter: "49" },
        gospel: { book: "Matthew", chapter: "28" },
        wisdom: { book: "Proverbs", chapter: "10" },
        oldTestament: { book: "Ezekiel", chapter: "1-3" },
        newTestament: { book: "3 John", chapter: "1" }
    },
    {
        day: 200,
        psalm: { book: "Psalm", chapter: "50" },
        gospel: { book: "Mark", chapter: "1" },
        wisdom: { book: "Proverbs", chapter: "11" },
        oldTestament: { book: "Ezekiel", chapter: "4-7" },
        newTestament: { book: "Jude", chapter: "1" }
    },
    {
        day: 201,
        psalm: { book: "Psalm", chapter: "51" },
        gospel: { book: "Mark", chapter: "2" },
        wisdom: { book: "Proverbs", chapter: "12" },
        oldTestament: { book: "Ezekiel", chapter: "8-11" },
        newTestament: { book: "Romans", chapter: "1" }
    },
    {
        day: 202,
        psalm: { book: "Psalm", chapter: "52" },
        gospel: { book: "Mark", chapter: "3" },
        wisdom: { book: "Proverbs", chapter: "13" },
        oldTestament: { book: "Ezekiel", chapter: "12-14" },
        newTestament: { book: "Romans", chapter: "2" }
    },
    {
        day: 203,
        psalm: { book: "Psalm", chapter: "53" },
        gospel: { book: "Mark", chapter: "4" },
        wisdom: { book: "Proverbs", chapter: "14" },
        oldTestament: { book: "Ezekiel", chapter: "15-16" },
        newTestament: { book: "Romans", chapter: "3" }
    },
    {
        day: 204,
        psalm: { book: "Psalm", chapter: "54" },
        gospel: { book: "Mark", chapter: "5" },
        wisdom: { book: "Proverbs", chapter: "15" },
        oldTestament: { book: "Ezekiel", chapter: "17-19" },
        newTestament: { book: "Romans", chapter: "4" }
    },
    {
        day: 205,
        psalm: { book: "Psalm", chapter: "55" },
        gospel: { book: "Mark", chapter: "6" },
        wisdom: { book: "Proverbs", chapter: "16" },
        oldTestament: { book: "Ezekiel", chapter: "20-21" },
        newTestament: { book: "Romans", chapter: "5" }
    },
    {
        day: 206,
        psalm: { book: "Psalm", chapter: "56" },
        gospel: { book: "Mark", chapter: "7" },
        wisdom: { book: "Proverbs", chapter: "17" },
        oldTestament: { book: "Ezekiel", chapter: "22-23" },
        newTestament: { book: "Romans", chapter: "6" }
    },
    {
        day: 207,
        psalm: { book: "Psalm", chapter: "57" },
        gospel: { book: "Mark", chapter: "8" },
        wisdom: { book: "Proverbs", chapter: "18" },
        oldTestament: { book: "Ezekiel", chapter: "24-26" },
        newTestament: { book: "Romans", chapter: "7" }
    },
    {
        day: 208,
        psalm: { book: "Psalm", chapter: "58" },
        gospel: { book: "Mark", chapter: "9" },
        wisdom: { book: "Proverbs", chapter: "19" },
        oldTestament: { book: "Ezekiel", chapter: "27-29" },
        newTestament: { book: "Romans", chapter: "8" }
    },
    {
        day: 209,
        psalm: { book: "Psalm", chapter: "59" },
        gospel: { book: "Mark", chapter: "10" },
        wisdom: { book: "Proverbs", chapter: "20" },
        oldTestament: { book: "Ezekiel", chapter: "30-32" },
        newTestament: { book: "Romans", chapter: "9" }
    },
    {
        day: 210,
        psalm: { book: "Psalm", chapter: "60" },
        gospel: { book: "Mark", chapter: "11" },
        wisdom: { book: "Proverbs", chapter: "21" },
        oldTestament: { book: "Ezekiel", chapter: "33-34" },
        newTestament: { book: "Romans", chapter: "10" }
    },
    {
        day: 211,
        psalm: { book: "Psalm", chapter: "61" },
        gospel: { book: "Mark", chapter: "12" },
        wisdom: { book: "Proverbs", chapter: "22" },
        oldTestament: { book: "Ezekiel", chapter: "35-36" },
        newTestament: { book: "Romans", chapter: "11" }
    },
    {
        day: 212,
        psalm: { book: "Psalm", chapter: "62" },
        gospel: { book: "Mark", chapter: "13" },
        wisdom: { book: "Proverbs", chapter: "23" },
        oldTestament: { book: "Ezekiel", chapter: "37-38" },
        newTestament: { book: "Romans", chapter: "12" }
    },
    {
        day: 213,
        psalm: { book: "Psalm", chapter: "63" },
        gospel: { book: "Mark", chapter: "14" },
        wisdom: { book: "Proverbs", chapter: "24" },
        oldTestament: { book: "Ezekiel", chapter: "39-40" },
        newTestament: { book: "Romans", chapter: "13" }
    },
    {
        day: 214,
        psalm: { book: "Psalm", chapter: "64" },
        gospel: { book: "Mark", chapter: "15" },
        wisdom: { book: "Proverbs", chapter: "25" },
        oldTestament: { book: "Ezekiel", chapter: "41-42" },
        newTestament: { book: "Romans", chapter: "14" }
    },
    {
        day: 215,
        psalm: { book: "Psalm", chapter: "65" },
        gospel: { book: "Mark", chapter: "16" },
        wisdom: { book: "Proverbs", chapter: "26" },
        oldTestament: { book: "Ezekiel", chapter: "43-45" },
        newTestament: { book: "Romans", chapter: "15" }
    },
    {
        day: 216,
        psalm: { book: "Psalm", chapter: "66" },
        gospel: { book: "Luke", chapter: "1" },
        wisdom: { book: "Proverbs", chapter: "27" },
        oldTestament: { book: "Ezekiel", chapter: "46-48" },
        newTestament: { book: "Romans", chapter: "16" }
    },
    {
        day: 217,
        psalm: { book: "Psalm", chapter: "67" },
        gospel: { book: "Luke", chapter: "2" },
        wisdom: { book: "Proverbs", chapter: "28" },
        oldTestament: { book: "Daniel", chapter: "1-2" },
        newTestament: { book: "1 Corinthians", chapter: "1" }
    },
    {
        day: 218,
        psalm: { book: "Psalm", chapter: "68" },
        gospel: { book: "Luke", chapter: "3" },
        wisdom: { book: "Proverbs", chapter: "29" },
        oldTestament: { book: "Daniel", chapter: "3" },
        newTestament: { book: "1 Corinthians", chapter: "2" }
    },
    {
        day: 219,
        psalm: { book: "Psalm", chapter: "69" },
        gospel: { book: "Luke", chapter: "4" },
        wisdom: { book: "Proverbs", chapter: "30" },
        oldTestament: { book: "Daniel", chapter: "4-6" },
        newTestament: { book: "1 Corinthians", chapter: "3" }
    },
    {
        day: 220,
        psalm: { book: "Psalm", chapter: "70" },
        gospel: { book: "Luke", chapter: "5" },
        wisdom: { book: "Proverbs", chapter: "31" },
        oldTestament: { book: "Daniel", chapter: "7-9" },
        newTestament: { book: "1 Corinthians", chapter: "4" }
    },
    {
        day: 221,
        psalm: { book: "Psalm", chapter: "71" },
        gospel: { book: "Luke", chapter: "6" },
        wisdom: { book: "Ecclesiastes", chapter: "1-2" },
        oldTestament: { book: "Daniel", chapter: "10-12" },
        newTestament: { book: "1 Corinthians", chapter: "5" }
    },
    {
        day: 222,
        psalm: { book: "Psalm", chapter: "72" },
        gospel: { book: "Luke", chapter: "7" },
        wisdom: { book: "Ecclesiastes", chapter: "3-4" },
        oldTestament: { book: "Daniel", chapter: "13" },
        newTestament: { book: "1 Corinthians", chapter: "6" }
    },
    {
        day: 223,
        psalm: { book: "Psalm", chapter: "73" },
        gospel: { book: "Luke", chapter: "8" },
        wisdom: { book: "Ecclesiastes", chapter: "5-6" },
        oldTestament: { book: "Daniel", chapter: "14" },
        newTestament: { book: "1 Corinthians", chapter: "7" }
    },
    {
        day: 224,
        psalm: { book: "Psalm", chapter: "74" },
        gospel: { book: "Luke", chapter: "9" },
        wisdom: { book: "Ecclesiastes", chapter: "7-8" },
        oldTestament: { book: "Obadiah", chapter: "1" },
        newTestament: { book: "1 Corinthians", chapter: "8" }
    },
    {
        day: 225,
        psalm: { book: "Psalm", chapter: "75" },
        gospel: { book: "Luke", chapter: "10" },
        wisdom: { book: "Ecclesiastes", chapter: "9-10" },
        oldTestament: { book: "Haggai", chapter: "1-2" },
        newTestament: { book: "1 Corinthians", chapter: "9" }
    },
    {
        day: 226,
        psalm: { book: "Psalm", chapter: "76" },
        gospel: { book: "Luke", chapter: "11" },
        wisdom: { book: "Ecclesiastes", chapter: "11-12" },
        oldTestament: { book: "Zechariah", chapter: "1-5" },
        newTestament: { book: "1 Corinthians", chapter: "10" }
    },
    {
        day: 227,
        psalm: { book: "Psalm", chapter: "77" },
        gospel: { book: "Luke", chapter: "12" },
        wisdom: { book: "Song of Solomon", chapter: "1-2" },
        oldTestament: { book: "Zechariah", chapter: "6-9" },
        newTestament: { book: "1 Corinthians", chapter: "11" }
    },
    {
        day: 228,
        psalm: { book: "Psalm", chapter: "78" },
        gospel: { book: "Luke", chapter: "13" },
        wisdom: { book: "Song of Solomon", chapter: "3-4" },
        oldTestament: { book: "Zechariah", chapter: "10-14" },
        newTestament: { book: "1 Corinthians", chapter: "12" }
    },
    {
        day: 229,
        psalm: { book: "Psalm", chapter: "79" },
        gospel: { book: "Luke", chapter: "14" },
        wisdom: { book: "Song of Solomon", chapter: "5-6" },
        oldTestament: { book: "Malachi", chapter: "1-4" },
        newTestament: { book: "1 Corinthians", chapter: "13" }
    },
    {
        day: 230,
        psalm: { book: "Psalm", chapter: "80" },
        gospel: { book: "Luke", chapter: "15" },
        wisdom: { book: "Song of Solomon", chapter: "7-8" },
        oldTestament: { book: "Joel", chapter: "1-3" },
        newTestament: { book: "1 Corinthians", chapter: "14" }
    },
    {
        day: 231,
        psalm: { book: "Psalm", chapter: "81" },
        gospel: { book: "Luke", chapter: "16" },
        wisdom: { book: "Wisdom of Solomon", chapter: "1" },
        oldTestament: { book: "Jonah", chapter: "1-4" },
        newTestament: { book: "1 Corinthians", chapter: "15" }
    },
    {
        day: 232,
        psalm: { book: "Psalm", chapter: "82" },
        gospel: { book: "Luke", chapter: "17" },
        wisdom: { book: "Wisdom of Solomon", chapter: "2" },
        oldTestament: { book: "1 Chronicles", chapter: "1" },
        newTestament: { book: "1 Corinthians", chapter: "16" }
    },
    {
        day: 233,
        psalm: { book: "Psalm", chapter: "83" },
        gospel: { book: "Luke", chapter: "18" },
        wisdom: { book: "Wisdom of Solomon", chapter: "3" },
        oldTestament: { book: "1 Chronicles", chapter: "2-3" },
        newTestament: { book: "2 Corinthians", chapter: "1" }
    },
    {
        day: 234,
        psalm: { book: "Psalm", chapter: "84" },
        gospel: { book: "Luke", chapter: "19" },
        wisdom: { book: "Wisdom of Solomon", chapter: "4" },
        oldTestament: { book: "1 Chronicles", chapter: "4-5" },
        newTestament: { book: "2 Corinthians", chapter: "2" }
    },
    {
        day: 235,
        psalm: { book: "Psalm", chapter: "85" },
        gospel: { book: "Luke", chapter: "20" },
        wisdom: { book: "Wisdom of Solomon", chapter: "5" },
        oldTestament: { book: "1 Chronicles", chapter: "6" },
        newTestament: { book: "2 Corinthians", chapter: "3" }
    },
    {
        day: 236,
        psalm: { book: "Psalm", chapter: "86" },
        gospel: { book: "Luke", chapter: "21" },
        wisdom: { book: "Wisdom of Solomon", chapter: "6" },
        oldTestament: { book: "1 Chronicles", chapter: "7-8" },
        newTestament: { book: "2 Corinthians", chapter: "4-5" }
    },
    {
        day: 237,
        psalm: { book: "Psalm", chapter: "87" },
        gospel: { book: "Luke", chapter: "22" },
        wisdom: { book: "Wisdom of Solomon", chapter: "7" },
        oldTestament: { book: "1 Chronicles", chapter: "9-10" },
        newTestament: { book: "2 Corinthians", chapter: "6-7" }
    },
    {
        day: 238,
        psalm: { book: "Psalm", chapter: "88" },
        gospel: { book: "Luke", chapter: "23" },
        wisdom: { book: "Wisdom of Solomon", chapter: "8" },
        oldTestament: { book: "1 Chronicles", chapter: "11-12" },
        newTestament: { book: "2 Corinthians", chapter: "8" }
    },
    {
        day: 239,
        psalm: { book: "Psalm", chapter: "89" },
        gospel: { book: "Luke", chapter: "24" },
        wisdom: { book: "Wisdom of Solomon", chapter: "9" },
        oldTestament: { book: "1 Chronicles", chapter: "13-15" },
        newTestament: { book: "2 Corinthians", chapter: "9-10" }
    },
    {
        day: 240,
        psalm: { book: "Psalm", chapter: "90" },
        gospel: { book: "Acts", chapter: "1" },
        wisdom: { book: "Wisdom of Solomon", chapter: "10" },
        oldTestament: { book: "1 Chronicles", chapter: "16-17" },
        newTestament: { book: "2 Corinthians", chapter: "11" }
    },
    {
        day: 241,
        psalm: { book: "Psalm", chapter: "91" },
        gospel: { book: "Acts", chapter: "2" },
        wisdom: { book: "Wisdom of Solomon", chapter: "11" },
        oldTestament: { book: "1 Chronicles", chapter: "18-21" },
        newTestament: { book: "2 Corinthians", chapter: "12-13" }
    },
    {
        day: 242,
        psalm: { book: "Psalm", chapter: "92" },
        gospel: { book: "Acts", chapter: "3" },
        wisdom: { book: "Wisdom of Solomon", chapter: "12" },
        oldTestament: { book: "1 Chronicles", chapter: "22-24" },
        newTestament: { book: "Galatians", chapter: "1" }
    },
    {
        day: 243,
        psalm: { book: "Psalm", chapter: "93" },
        gospel: { book: "Acts", chapter: "4" },
        wisdom: { book: "Wisdom of Solomon", chapter: "13" },
        oldTestament: { book: "1 Chronicles", chapter: "25-26" },
        newTestament: { book: "Galatians", chapter: "2" }
    },
    {
        day: 244,
        psalm: { book: "Psalm", chapter: "94" },
        gospel: { book: "Acts", chapter: "5" },
        wisdom: { book: "Wisdom of Solomon", chapter: "14" },
        oldTestament: { book: "1 Chronicles", chapter: "27-29" },
        newTestament: { book: "Galatians", chapter: "3" }
    },
    {
        day: 245,
        psalm: { book: "Psalm", chapter: "95" },
        gospel: { book: "Acts", chapter: "6" },
        wisdom: { book: "Wisdom of Solomon", chapter: "15" },
        oldTestament: { book: "2 Chronicles", chapter: "1-4" },
        newTestament: { book: "Galatians", chapter: "4" }
    },
    {
        day: 246,
        psalm: { book: "Psalm", chapter: "96" },
        gospel: { book: "Acts", chapter: "7" },
        wisdom: { book: "Wisdom of Solomon", chapter: "16" },
        oldTestament: { book: "2 Chronicles", chapter: "5-7" },
        newTestament: { book: "Galatians", chapter: "5" }
    },
    {
        day: 247,
        psalm: { book: "Psalm", chapter: "97" },
        gospel: { book: "Acts", chapter: "8" },
        wisdom: { book: "Wisdom of Solomon", chapter: "17" },
        oldTestament: { book: "2 Chronicles", chapter: "8-10" },
        newTestament: { book: "Galatians", chapter: "6" }
    },
    {
        day: 248,
        psalm: { book: "Psalm", chapter: "98" },
        gospel: { book: "Acts", chapter: "9" },
        wisdom: { book: "Wisdom of Solomon", chapter: "18" },
        oldTestament: { book: "2 Chronicles", chapter: "11-13" },
        newTestament: { book: "Ephesians", chapter: "1" }
    },
    {
        day: 249,
        psalm: { book: "Psalm", chapter: "99" },
        gospel: { book: "Acts", chapter: "10" },
        wisdom: { book: "Wisdom of Solomon", chapter: "19" },
        oldTestament: { book: "2 Chronicles", chapter: "14-17" },
        newTestament: { book: "Ephesians", chapter: "2" }
    },
    {
        day: 250,
        psalm: { book: "Psalm", chapter: "100" },
        gospel: { book: "Acts", chapter: "11" },
        wisdom: { book: "Sirach", chapter: "1" },
        oldTestament: { book: "2 Chronicles", chapter: "18-20" },
        newTestament: { book: "Ephesians", chapter: "3" }
    },
    {
        day: 251,
        psalm: { book: "Psalm", chapter: "101" },
        gospel: { book: "Acts", chapter: "12" },
        wisdom: { book: "Sirach", chapter: "2" },
        oldTestament: { book: "2 Chronicles", chapter: "21-23" },
        newTestament: { book: "Ephesians", chapter: "4" }
    },
    {
        day: 252,
        psalm: { book: "Psalm", chapter: "102" },
        gospel: { book: "Acts", chapter: "13" },
        wisdom: { book: "Sirach", chapter: "3" },
        oldTestament: { book: "2 Chronicles", chapter: "24-26" },
        newTestament: { book: "Ephesians", chapter: "5" }
    },
    {
        day: 253,
        psalm: { book: "Psalm", chapter: "103" },
        gospel: { book: "Acts", chapter: "14" },
        wisdom: { book: "Sirach", chapter: "4" },
        oldTestament: { book: "2 Chronicles", chapter: "27-29" },
        newTestament: { book: "Ephesians", chapter: "6" }
    },
    {
        day: 254,
        psalm: { book: "Psalm", chapter: "104" },
        gospel: { book: "Acts", chapter: "15" },
        wisdom: { book: "Sirach", chapter: "5" },
        oldTestament: { book: "2 Chronicles", chapter: "30-32" },
        newTestament: { book: "Philippians", chapter: "1" }
    },
    {
        day: 255,
        psalm: { book: "Psalm", chapter: "105" },
        gospel: { book: "Acts", chapter: "16" },
        wisdom: { book: "Sirach", chapter: "6" },
        oldTestament: { book: "2 Chronicles", chapter: "33-34" },
        newTestament: { book: "Philippians", chapter: "2" }
    },
    {
        day: 256,
        psalm: { book: "Psalm", chapter: "106" },
        gospel: { book: "Acts", chapter: "17" },
        wisdom: { book: "Sirach", chapter: "7" },
        oldTestament: { book: "2 Chronicles", chapter: "35-36" },
        newTestament: { book: "Philippians", chapter: "3" }
    },
    {
        day: 257,
        psalm: { book: "Psalm", chapter: "107" },
        gospel: { book: "Acts", chapter: "18" },
        wisdom: { book: "Sirach", chapter: "8" },
        oldTestament: { book: "Ezra", chapter: "1-2" },
        newTestament: { book: "Philippians", chapter: "4" }
    },
    {
        day: 258,
        psalm: { book: "Psalm", chapter: "108" },
        gospel: { book: "Acts", chapter: "19" },
        wisdom: { book: "Sirach", chapter: "9" },
        oldTestament: { book: "Ezra", chapter: "3-6" },
        newTestament: { book: "Colossians", chapter: "1" }
    },
    {
        day: 259,
        psalm: { book: "Psalm", chapter: "109" },
        gospel: { book: "Acts", chapter: "20" },
        wisdom: { book: "Sirach", chapter: "10" },
        oldTestament: { book: "Ezra", chapter: "7-8" },
        newTestament: { book: "Colossians", chapter: "2" }
    },
    {
        day: 260,
        psalm: { book: "Psalm", chapter: "110" },
        gospel: { book: "Acts", chapter: "21" },
        wisdom: { book: "Sirach", chapter: "11" },
        oldTestament: { book: "Ezra", chapter: "9-10" },
        newTestament: { book: "Colossians", chapter: "3-4" }
    },
    {
        day: 261,
        psalm: { book: "Psalm", chapter: "111" },
        gospel: { book: "Acts", chapter: "22" },
        wisdom: { book: "Sirach", chapter: "12" },
        oldTestament: { book: "Nehemiah", chapter: "1-3" },
        newTestament: { book: "1 Thessalonians", chapter: "1-3" }
    },
    {
        day: 262,
        psalm: { book: "Psalm", chapter: "112" },
        gospel: { book: "Acts", chapter: "23" },
        wisdom: { book: "Sirach", chapter: "13" },
        oldTestament: { book: "Nehemiah", chapter: "4-6" },
        newTestament: { book: "1 Thessalonians", chapter: "4-5" }
    },
    {
        day: 263,
        psalm: { book: "Psalm", chapter: "113" },
        gospel: { book: "Acts", chapter: "24" },
        wisdom: { book: "Sirach", chapter: "14" },
        oldTestament: { book: "Nehemiah", chapter: "7" },
        newTestament: { book: "2 Thessalonians", chapter: "1-3" }
    },
    {
        day: 264,
        psalm: { book: "Psalm", chapter: "114" },
        gospel: { book: "Acts", chapter: "25" },
        wisdom: { book: "Sirach", chapter: "15" },
        oldTestament: { book: "Nehemiah", chapter: "8-9" },
        newTestament: { book: "1 Timothy", chapter: "1-2" }
    },
    {
        day: 265,
        psalm: { book: "Psalm", chapter: "115" },
        gospel: { book: "Acts", chapter: "26" },
        wisdom: { book: "Sirach", chapter: "16" },
        oldTestament: { book: "Nehemiah", chapter: "10-11" },
        newTestament: { book: "1 Timothy", chapter: "3-4" }
    },
    {
        day: 266,
        psalm: { book: "Psalm", chapter: "116" },
        gospel: { book: "Acts", chapter: "27" },
        wisdom: { book: "Sirach", chapter: "17" },
        oldTestament: { book: "Nehemiah", chapter: "12-13" },
        newTestament: { book: "1 Timothy", chapter: "5" }
    },
    {
        day: 267,
        psalm: { book: "Psalm", chapter: "117" },
        gospel: { book: "Acts", chapter: "28" },
        wisdom: { book: "Sirach", chapter: "18" },
        oldTestament: { book: "Tobit", chapter: "1-3" },
        newTestament: { book: "1 Timothy", chapter: "6" }
    },
    {
        day: 268,
        psalm: { book: "Psalm", chapter: "118" },
        gospel: { book: "Revelation", chapter: "1" },
        wisdom: { book: "Sirach", chapter: "19" },
        oldTestament: { book: "Tobit", chapter: "4-6" },
        newTestament: { book: "2 Timothy", chapter: "1-2" }
    },
    {
        day: 269,
        psalm: { book: "Psalm", chapter: "119" },
        gospel: { book: "Revelation", chapter: "2" },
        wisdom: { book: "Sirach", chapter: "20" },
        oldTestament: { book: "Tobit", chapter: "7-10" },
        newTestament: { book: "2 Timothy", chapter: "3-4" }
    },
    {
        day: 270,
        psalm: { book: "Psalm", chapter: "120" },
        gospel: { book: "Revelation", chapter: "3" },
        wisdom: { book: "Sirach", chapter: "21" },
        oldTestament: { book: "Tobit", chapter: "11-14" },
        newTestament: { book: "Titus", chapter: "1-3" }
    },
    {
        day: 271,
        psalm: { book: "Psalm", chapter: "121" },
        gospel: { book: "Revelation", chapter: "4" },
        wisdom: { book: "Sirach", chapter: "22" },
        oldTestament: { book: "Judith", chapter: "1-4" },
        newTestament: { book: "Philemon", chapter: "1" }
    },
    {
        day: 272,
        psalm: { book: "Psalm", chapter: "122" },
        gospel: { book: "Revelation", chapter: "5" },
        wisdom: { book: "Sirach", chapter: "23" },
        oldTestament: { book: "Judith", chapter: "5-7" },
        newTestament: { book: "Hebrews", chapter: "1-2" }
    },
    {
        day: 273,
        psalm: { book: "Psalm", chapter: "123" },
        gospel: { book: "Revelation", chapter: "6" },
        wisdom: { book: "Sirach", chapter: "24" },
        oldTestament: { book: "Judith", chapter: "8-9" },
        newTestament: { book: "Hebrews", chapter: "3" }
    },
    {
        day: 274,
        psalm: { book: "Psalm", chapter: "124" },
        gospel: { book: "Revelation", chapter: "7" },
        wisdom: { book: "Sirach", chapter: "25" },
        oldTestament: { book: "Judith", chapter: "10-12" },
        newTestament: { book: "Hebrews", chapter: "4-5" }
    },
    {
        day: 275,
        psalm: { book: "Psalm", chapter: "125" },
        gospel: { book: "Revelation", chapter: "8" },
        wisdom: { book: "Sirach", chapter: "26" },
        oldTestament: { book: "Judith", chapter: "13-16" },
        newTestament: { book: "Hebrews", chapter: "6" }
    },
    {
        day: 276,
        psalm: { book: "Psalm", chapter: "126" },
        gospel: { book: "Revelation", chapter: "9" },
        wisdom: { book: "Sirach", chapter: "27" },
        oldTestament: { book: "Esther", chapter: "1-3" },
        newTestament: { book: "Hebrews", chapter: "7" }
    },
    {
        day: 277,
        psalm: { book: "Psalm", chapter: "127" },
        gospel: { book: "Revelation", chapter: "10" },
        wisdom: { book: "Sirach", chapter: "28" },
        oldTestament: { book: "Esther", chapter: "4-5" },
        newTestament: { book: "Hebrews", chapter: "8" }
    },
    {
        day: 278,
        psalm: { book: "Psalm", chapter: "128" },
        gospel: { book: "Revelation", chapter: "11" },
        wisdom: { book: "Sirach", chapter: "29" },
        oldTestament: { book: "Esther", chapter: "6-8" },
        newTestament: { book: "Hebrews", chapter: "9" }
    },
    {
        day: 279,
        psalm: { book: "Psalm", chapter: "129" },
        gospel: { book: "Revelation", chapter: "12" },
        wisdom: { book: "Sirach", chapter: "30" },
        oldTestament: { book: "Esther", chapter: "9-10" },
        newTestament: { book: "Hebrews", chapter: "10" }
    },
    {
        day: 280,
        psalm: { book: "Psalm", chapter: "130" },
        gospel: { book: "Revelation", chapter: "13" },
        wisdom: { book: "Sirach", chapter: "31" },
        oldTestament: { book: "1 Maccabees", chapter: "1" },
        newTestament: { book: "Hebrews", chapter: "11" }
    },
    {
        day: 281,
        psalm: { book: "Psalm", chapter: "131" },
        gospel: { book: "Revelation", chapter: "14" },
        wisdom: { book: "Sirach", chapter: "32" },
        oldTestament: { book: "1 Maccabees", chapter: "2" },
        newTestament: { book: "Hebrews", chapter: "12" }
    },
    {
        day: 282,
        psalm: { book: "Psalm", chapter: "132" },
        gospel: { book: "Revelation", chapter: "15" },
        wisdom: { book: "Sirach", chapter: "33" },
        oldTestament: { book: "1 Maccabees", chapter: "3" },
        newTestament: { book: "Hebrews", chapter: "13" }
    },
    {
        day: 283,
        psalm: { book: "Psalm", chapter: "133" },
        gospel: { book: "Revelation", chapter: "16" },
        wisdom: { book: "Sirach", chapter: "34" },
        oldTestament: { book: "1 Maccabees", chapter: "4" },
        newTestament: { book: "James", chapter: "1" }
    },
    {
        day: 284,
        psalm: { book: "Psalm", chapter: "134" },
        gospel: { book: "Revelation", chapter: "17" },
        wisdom: { book: "Sirach", chapter: "35" },
        oldTestament: { book: "1 Maccabees", chapter: "5" },
        newTestament: { book: "James", chapter: "2" }
    },
    {
        day: 285,
        psalm: { book: "Psalm", chapter: "135" },
        gospel: { book: "Revelation", chapter: "18" },
        wisdom: { book: "Sirach", chapter: "36" },
        oldTestament: { book: "1 Maccabees", chapter: "6" },
        newTestament: { book: "James", chapter: "3" }
    },
    {
        day: 286,
        psalm: { book: "Psalm", chapter: "136" },
        gospel: { book: "Revelation", chapter: "19" },
        wisdom: { book: "Sirach", chapter: "37" },
        oldTestament: { book: "1 Maccabees", chapter: "7-8" },
        newTestament: { book: "James", chapter: "4" }
    },
    {
        day: 287,
        psalm: { book: "Psalm", chapter: "137" },
        gospel: { book: "Revelation", chapter: "20" },
        wisdom: { book: "Sirach", chapter: "38" },
        oldTestament: { book: "1 Maccabees", chapter: "9" },
        newTestament: { book: "James", chapter: "5" }
    },
    {
        day: 288,
        psalm: { book: "Psalm", chapter: "138" },
        gospel: { book: "Revelation", chapter: "21" },
        wisdom: { book: "Sirach", chapter: "39" },
        oldTestament: { book: "1 Maccabees", chapter: "10" },
        newTestament: { book: "1 Peter", chapter: "1" }
    },
    {
        day: 289,
        psalm: { book: "Psalm", chapter: "139" },
        gospel: { book: "Revelation", chapter: "22" },
        wisdom: { book: "Sirach", chapter: "40" },
        oldTestament: { book: "1 Maccabees", chapter: "11" },
        newTestament: { book: "1 Peter", chapter: "2" }
    },
    {
        day: 290,
        psalm: { book: "Psalm", chapter: "140" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "41" },
        oldTestament: { book: "1 Maccabees", chapter: "12" },
        newTestament: { book: "1 Peter", chapter: "3" }
    },
    {
        day: 291,
        psalm: { book: "Psalm", chapter: "141" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "42" },
        oldTestament: { book: "1 Maccabees", chapter: "13-14" },
        newTestament: { book: "1 Peter", chapter: "4" }
    },
    {
        day: 292,
        psalm: { book: "Psalm", chapter: "142" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "43" },
        oldTestament: { book: "1 Maccabees", chapter: "15-16" },
        newTestament: { book: "1 Peter", chapter: "5" }
    },
    {
        day: 293,
        psalm: { book: "Psalm", chapter: "143" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "44" },
        oldTestament: { book: "2 Maccabees", chapter: "1-2" },
        newTestament: { book: "2 Peter", chapter: "1-3" }
    },
    {
        day: 294,
        psalm: { book: "Psalm", chapter: "144" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "45" },
        oldTestament: { book: "2 Maccabees", chapter: "3" },
        newTestament: { book: "1 John", chapter: "1-2" }
    },
    {
        day: 295,
        psalm: { book: "Psalm", chapter: "145" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "46" },
        oldTestament: { book: "2 Maccabees", chapter: "4-5" },
        newTestament: { book: "1 John", chapter: "3" }
    },
    {
        day: 296,
        psalm: { book: "Psalm", chapter: "146" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "47" },
        oldTestament: { book: "2 Maccabees", chapter: "6-7" },
        newTestament: { book: "1 John", chapter: "4" }
    },
    {
        day: 297,
        psalm: { book: "Psalm", chapter: "147" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "48" },
        oldTestament: { book: "2 Maccabees", chapter: "8-9" },
        newTestament: { book: "1 John", chapter: "5" }
    },
    {
        day: 298,
        psalm: { book: "Psalm", chapter: "148" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "49" },
        oldTestament: { book: "2 Maccabees", chapter: "10-11" },
        newTestament: { book: "2 John", chapter: "1" }
    },
    {
        day: 299,
        psalm: { book: "Psalm", chapter: "149" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "50" },
        oldTestament: { book: "2 Maccabees", chapter: "12-13" },
        newTestament: { book: "3 John", chapter: "1" }
    },
    {
        day: 300,
        psalm: { book: "Psalm", chapter: "150" },
        gospel: { book: "Parable", chapter: "" },
        wisdom: { book: "Sirach", chapter: "51" },
        oldTestament: { book: "2 Maccabees", chapter: "14-15" },
        newTestament: { book: "Jude", chapter: "1" }
    }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = READING_PLAN;
} else if (typeof window !== 'undefined') {
    window.READING_PLAN = READING_PLAN;
}