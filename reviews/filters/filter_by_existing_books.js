#!/bin/node

const fs = require("fs");
const readline = require("readline");
const BOOK_IDS_PATH = "./goodreads_book_ids.txt";

const book_ids = new Set(fs.readFileSync(BOOK_IDS_PATH)
    .toString()
    .split("\n")
    .filter((line) => line.length > 0));

const readInterface = readline.createInterface({
    input: process.stdin,
});

let has = 0;
let hasnt = 0;

const handleJSONLine = (json_line) => {
    const review = JSON.parse(json_line);
    const year = parseInt(review.date, 10);
    
    if (book_ids.has(review.book_id)) {
        console.info(JSON.stringify(review));
    }
}

readInterface.on("line", handleJSONLine);
