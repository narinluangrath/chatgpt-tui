export default `Sure! Here are some sample functions you can use:

\`\`\`javascript
[32m// Pretty prints a date object[39m
[33m[34mfunction[39m[33m prettyPrintDate(date) [39m{
  [34mreturn[39m [31m\`\${date.getFullYear()}-\${date.getMonth() + [32m1[39m[31m}-\${date.getDate()}\`[39m;
}

[32m// Displays a date object in different common time zones[39m
[33m[34mfunction[39m[33m displayDateInTimezone(date, timezone) [39m{
  [34mconst[39m displayDate = [34mnew[39m [36mDate[39m(date.toLocaleString([34mundefined[39m, { [36mtimeZone[39m: timezone }));
  [34mreturn[39m prettyPrintDate(displayDate);
}

[32m// Calculates the difference in years, months, weeks, days, hours, and seconds between two date objects[39m
[33m[34mfunction[39m[33m timeDifference(start, end) [39m{
  [34mconst[39m diffInMS = end.getTime() - start.getTime();

  [34mconst[39m seconds = [36mMath[39m.floor(diffInMS / [32m1000[39m) % [32m60[39m;
  [34mconst[39m minutes = [36mMath[39m.floor(diffInMS / ([32m1000[39m * [32m60[39m)) % [32m60[39m;
  [34mconst[39m hours = [36mMath[39m.floor(diffInMS / ([32m1000[39m * [32m60[39m * [32m60[39m)) % [32m24[39m;
  [34mconst[39m days = [36mMath[39m.floor(diffInMS / ([32m1000[39m * [32m60[39m * [32m60[39m * [32m24[39m)) % [32m7[39m;
  [34mconst[39m weeks = [36mMath[39m.floor(diffInMS / ([32m1000[39m * [32m60[39m * [32m60[39m * [32m24[39m * [32m7[39m)) % [32m4[39m;
  [34mconst[39m months = end.getMonth() - start.getMonth() + ([32m12[39m * (end.getFullYear() - start.getFullYear()));
  [34mconst[39m years = end.getFullYear() - start.getFullYear();

  [34mreturn[39m {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  };
}
\`\`\`

Here are some example usages of these functions:

\`\`\`javascript
[34mconst[39m myDate = [34mnew[39m [36mDate[39m([32m2021[39m, [32m3[39m, [32m1[39m);

[32m// Pretty prints the date[39m
[36mconsole[39m.log(prettyPrintDate(myDate)); [32m// "2021-4-1"[39m

[32m// Displays the date in different time zones[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'America/New_York'[39m)); [32m// "2021-4-1"[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'Europe/London'[39m)); [32m// "2021-4-1"[39m
[36mconsole[39m.log(displayDateInTimezone(myDate, [31m'Asia/Tokyo'[39m)); [32m// "2021-4-1"[39m

[32m// Calculates time difference between two dates[39m
[34mconst[39m start = [34mnew[39m [36mDate[39m([32m2020[39m, [32m0[39m, [32m1[39m);
[34mconst[39m end = [34mnew[39m [36mDate[39m([32m2021[39m, [32m0[39m, [32m1[39m);
[36mconsole[39m.log(timeDifference(start, end)); [32m// { years: 1, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }[39m
\`\`\`
`;
