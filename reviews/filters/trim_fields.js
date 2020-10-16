#!/bin/node

const readline = require("readline");

const readInterface = readline.createInterface({
    input: process.stdin,
});

const handleJSONLine = (json_line) => {
    const {book_id, rating, review_text, date_added} = JSON.parse(json_line);

    console.info(JSON.stringify({
        book_id,
        rating,
        review_text,
        date_added,
    }));
}

readInterface.on("line", handleJSONLine);