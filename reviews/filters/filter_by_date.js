#!/bin/node

const readline = require("readline");
const YEAR_LOWER_BOUND = 2016;
const YEAR_UPPER_BOUND = 2017;

const isDateInBounds = (date) => (
    date >= YEAR_LOWER_BOUND && date <= YEAR_UPPER_BOUND
);

const readInterface = readline.createInterface({
    input: process.stdin,
});

const handleJSONLine = (json_line) => {
    const review = JSON.parse(json_line);
    const year = parseInt(review.date, 10);
    
    if (isDateInBounds(year)) {
        console.info(JSON.stringify(review));
    }
}

readInterface.on("line", handleJSONLine);