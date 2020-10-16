#!/bin/node

const readline = require("readline");
const MONTHS = require("./months");
const DATE_REGEX = /.{3} (\w{3}) (\d{2}) .{8} .{5} (\d{4})/;

const readInterface = readline.createInterface({
    input: process.stdin,
});

const handleJSONLine = (json_line) => {
    const review = JSON.parse(json_line);

    const date_matches = DATE_REGEX.exec(review.date_added);
    delete review.date_added;
    review.date = `${date_matches[3]}-${MONTHS[date_matches[1]]}-${date_matches[2]}`;

    console.info(JSON.stringify(review));
}

readInterface.on("line", handleJSONLine);