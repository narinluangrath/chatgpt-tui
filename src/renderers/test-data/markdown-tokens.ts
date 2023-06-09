export default [
  "",
  "Sure",
  "!",
  " Here",
  " are",
  " some",
  " sample",
  " functions",
  " you",
  " can",
  " use",
  ":\n\n",
  "```",
  "javascript",
  "\n",
  "//",
  " Pretty",
  " prints",
  " a",
  " date",
  " object",
  "\n",
  "function",
  " pretty",
  "Print",
  "Date",
  "(date",
  ")",
  " {\n",
  " ",
  " return",
  " `${",
  "date",
  ".getFullYear",
  "()",
  "}-${",
  "date",
  ".getMonth",
  "()",
  " +",
  " ",
  "1",
  "}-${",
  "date",
  ".getDate",
  "()",
  "}`;\n",
  "}\n\n",
  "//",
  " Displays",
  " a",
  " date",
  " object",
  " in",
  " different",
  " common",
  " time",
  " zones",
  "\n",
  "function",
  " display",
  "Date",
  "In",
  "Time",
  "zone",
  "(date",
  ",",
  " timezone",
  ")",
  " {\n",
  " ",
  " const",
  " display",
  "Date",
  " =",
  " new",
  " Date",
  "(date",
  ".toLocale",
  "String",
  "(undefined",
  ",",
  " {",
  " timeZone",
  ":",
  " timezone",
  " }));\n",
  " ",
  " return",
  " pretty",
  "Print",
  "Date",
  "(display",
  "Date",
  ");\n",
  "}\n\n",
  "//",
  " Calculates",
  " the",
  " difference",
  " in",
  " years",
  ",",
  " months",
  ",",
  " weeks",
  ",",
  " days",
  ",",
  " hours",
  ",",
  " and",
  " seconds",
  " between",
  " two",
  " date",
  " objects",
  "\n",
  "function",
  " time",
  "Difference",
  "(start",
  ",",
  " end",
  ")",
  " {\n",
  " ",
  " const",
  " diff",
  "In",
  "MS",
  " =",
  " end",
  ".getTime",
  "()",
  " -",
  " start",
  ".getTime",
  "();\n\n",
  " ",
  " const",
  " seconds",
  " =",
  " Math",
  ".floor",
  "(diff",
  "In",
  "MS",
  " /",
  " ",
  "100",
  "0",
  ")",
  " %",
  " ",
  "60",
  ";\n",
  " ",
  " const",
  " minutes",
  " =",
  " Math",
  ".floor",
  "(diff",
  "In",
  "MS",
  " /",
  " (",
  "100",
  "0",
  " *",
  " ",
  "60",
  "))",
  " %",
  " ",
  "60",
  ";\n",
  " ",
  " const",
  " hours",
  " =",
  " Math",
  ".floor",
  "(diff",
  "In",
  "MS",
  " /",
  " (",
  "100",
  "0",
  " *",
  " ",
  "60",
  " *",
  " ",
  "60",
  "))",
  " %",
  " ",
  "24",
  ";\n",
  " ",
  " const",
  " days",
  " =",
  " Math",
  ".floor",
  "(diff",
  "In",
  "MS",
  " /",
  " (",
  "100",
  "0",
  " *",
  " ",
  "60",
  " *",
  " ",
  "60",
  " *",
  " ",
  "24",
  "))",
  " %",
  " ",
  "7",
  ";\n",
  " ",
  " const",
  " weeks",
  " =",
  " Math",
  ".floor",
  "(diff",
  "In",
  "MS",
  " /",
  " (",
  "100",
  "0",
  " *",
  " ",
  "60",
  " *",
  " ",
  "60",
  " *",
  " ",
  "24",
  " *",
  " ",
  "7",
  "))",
  " %",
  " ",
  "4",
  ";\n",
  " ",
  " const",
  " months",
  " =",
  " end",
  ".getMonth",
  "()",
  " -",
  " start",
  ".getMonth",
  "()",
  " +",
  " (",
  "12",
  " *",
  " (",
  "end",
  ".getFullYear",
  "()",
  " -",
  " start",
  ".getFullYear",
  "()));\n",
  " ",
  " const",
  " years",
  " =",
  " end",
  ".getFullYear",
  "()",
  " -",
  " start",
  ".getFullYear",
  "();\n\n",
  " ",
  " return",
  " {\n",
  "   ",
  " years",
  ",\n",
  "   ",
  " months",
  ",\n",
  "   ",
  " weeks",
  ",\n",
  "   ",
  " days",
  ",\n",
  "   ",
  " hours",
  ",\n",
  "   ",
  " minutes",
  ",\n",
  "   ",
  " seconds",
  "\n",
  " ",
  " };\n",
  "}\n",
  "``",
  "`\n\n",
  "Here",
  " are",
  " some",
  " example",
  " us",
  "ages",
  " of",
  " these",
  " functions",
  ":\n\n",
  "```",
  "javascript",
  "\n",
  "const",
  " my",
  "Date",
  " =",
  " new",
  " Date",
  "(",
  "202",
  "1",
  ",",
  " ",
  "3",
  ",",
  " ",
  "1",
  ");\n\n",
  "//",
  " Pretty",
  " prints",
  " the",
  " date",
  "\n",
  "console",
  ".log",
  "(p",
  "retty",
  "Print",
  "Date",
  "(my",
  "Date",
  "));",
  " //",
  ' "',
  "202",
  "1",
  "-",
  "4",
  "-",
  "1",
  '"\n\n',
  "//",
  " Displays",
  " the",
  " date",
  " in",
  " different",
  " time",
  " zones",
  "\n",
  "console",
  ".log",
  "(display",
  "Date",
  "In",
  "Time",
  "zone",
  "(my",
  "Date",
  ",",
  " '",
  "America",
  "/New",
  "_Y",
  "ork",
  "'));",
  " //",
  ' "',
  "202",
  "1",
  "-",
  "4",
  "-",
  "1",
  '"\n',
  "console",
  ".log",
  "(display",
  "Date",
  "In",
  "Time",
  "zone",
  "(my",
  "Date",
  ",",
  " '",
  "Europe",
  "/L",
  "ondon",
  "'));",
  " //",
  ' "',
  "202",
  "1",
  "-",
  "4",
  "-",
  "1",
  '"\n',
  "console",
  ".log",
  "(display",
  "Date",
  "In",
  "Time",
  "zone",
  "(my",
  "Date",
  ",",
  " '",
  "Asia",
  "/T",
  "ok",
  "yo",
  "'));",
  " //",
  ' "',
  "202",
  "1",
  "-",
  "4",
  "-",
  "1",
  '"\n\n',
  "//",
  " Calculates",
  " time",
  " difference",
  " between",
  " two",
  " dates",
  "\n",
  "const",
  " start",
  " =",
  " new",
  " Date",
  "(",
  "202",
  "0",
  ",",
  " ",
  "0",
  ",",
  " ",
  "1",
  ");\n",
  "const",
  " end",
  " =",
  " new",
  " Date",
  "(",
  "202",
  "1",
  ",",
  " ",
  "0",
  ",",
  " ",
  "1",
  ");\n",
  "console",
  ".log",
  "(time",
  "Difference",
  "(start",
  ",",
  " end",
  "));",
  " //",
  " {",
  " years",
  ":",
  " ",
  "1",
  ",",
  " months",
  ":",
  " ",
  "0",
  ",",
  " weeks",
  ":",
  " ",
  "0",
  ",",
  " days",
  ":",
  " ",
  "0",
  ",",
  " hours",
  ":",
  " ",
  "0",
  ",",
  " minutes",
  ":",
  " ",
  "0",
  ",",
  " seconds",
  ":",
  " ",
  "0",
  " }\n",
  "```\n", // This \n didn't exist, I added it lol
  "",
];
