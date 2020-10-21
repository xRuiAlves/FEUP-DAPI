#!/bin/node

const readline = require("readline");
const parse = require("csv-parse/lib/sync");
const fs = require("fs");

const CSV_HEADERS = Object.freeze([
    "goodreads_book_id",
    "title",
    "authors",
    "isbn",
    "publication_year",
    "language_code",
    "rating",
]);

console.info(CSV_HEADERS.join(","));

const readInterface = readline.createInterface({
    input: process.stdin,
});

let line_id = 0;
const handleCSVLine = (csv_line) => {
    if (line_id++ === 0) {
        return;
    }

    const book = parse(csv_line, { columns: false })[0];
    
    const goodreads_book_id = book[1];
    const title = book[9].length !== 0 ? book[9] : book[10];
    const authors = `"${book[7]}"`;
    const isbn = book[5];
    const publication_year = book[8].length !== 0 ? parseInt(book[8], 10): "";
    const language_code = book[11];
    const rating = book[12];
    
    console.info([
        goodreads_book_id,
        title,
        authors,
        isbn,
        publication_year,
        language_code,
        rating,
    ].join(","))
}

readInterface.on("line", handleCSVLine);
