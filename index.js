#!/usr/bin/env node

import chalk from 'chalk';


import { readFile } from 'fs/promises';

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)));


// check args from the command line
const args = process.argv.slice(2);
// check flags

// array of colors
const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
];

var color = colors[Math.floor(Math.random() * colors.length)];
// check: UTC time.
const UTCtime = () => {

    var d = new Date();
    var n = d.getUTCHours();
    var m = d.getUTCMinutes();
    var s = d.getUTCSeconds();

    console.log("UTC", chalk[color](n + ':' + m + ':' + s));

}

// check: local time.
const localTime = () => {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    console.log("Local", chalk[color](n + ':' + m + ':' + s));
}

// fetch time is pacific time
const pacificTime = () => {

    let d = new Date();
    let time = d.toLocaleString("en-US", {
        // date style dd/mm/yyyy
        // remove date
        timeZone: "America/Los_Angeles",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })
    console.log("LA", chalk[color](time))

}

// get ist time
const istTime = () => {
    // array of indian emojies
    let d = new Date();
    let time = d.toLocaleString("en-US", {
        // date style dd/mm/yyyy
        // remove date
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })
    console.log("IN", chalk[color](time))

}



if (args[0] === '-h' || args[0] === '--help') {
    console.log(`
    Usage:
    -h, --help: help
    -v, --version: version
    -l, --local: local time
    -u, --utc: utc time
    -p, --pacific: pacific time
    -i, --india: india time
    `);
}
// -l
else if (args[0] === '-l' || args[0] === '--local') {
    localTime();
}
// -u
else if (args[0] === '-u' || args[0] === '--utc') {
    UTCtime();
}
// -p
else if (args[0] === '-p' || args[0]==="-pst" || args[0] === '--pacific') {
    pacificTime();
}
// -i
else if (args[0] === '-i' || args[0] === '--india') {
    istTime();
}
// version
else if (args[0] === '-v' || args[0] === '--version') {
   console.log(chalk[color](pkg.name) ,`version`, chalk[color](pkg.version));
}

// default
else {
    UTCtime();
}


