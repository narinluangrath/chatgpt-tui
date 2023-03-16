export default `[34mconst[39m myDate = [34mnew[39m [36mDate[39m([32m2021[39m, [32m3[39m, [32m1[39m);

[32m// Pretty prints the date[39m
[36mconsole[39m.log(prettyPrintDate(myDate)); [32m// "2021-4-1"[39m

[32m// Displays the date in different time zones[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'America/New_York'[39m)); [32m// "2021-4-1"[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'Europe/London'[39m)); [32m// "2021-4-1"[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'Asia/Tokyo'[39m)); [32m// "2021-4-1"[39m

[32m// Calculates time difference between two dates[39m
[34mconst[39m start = [34mnew[39m [36mDate[39m([32m2020[39m, [32m0[39m, [32m1[39m);
[34mconst[39m end = [34mnew[39m [36mDate[39m([32m2021[39m, [32m0[39m, [32m1[39m);
[36mconsole[39m.log(timeDifference(start, end)); [32m// { years: 1, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }[39m`;
