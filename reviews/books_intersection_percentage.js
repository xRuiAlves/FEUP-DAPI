#!/bin/node

/**
 * Compute the percentage of books from a books dataset that have at least one review in a reviews dataset
 */

const fs = require("fs");
const readline = require("readline");
const { execSync } = require("child_process");

if (process.argv.length < 4) {
    console.error("Invalid number of arguments");
    console.error("Usage: node books_intersection_percentage.js <book_ids_file> <reviews_file>");
    process.exit(1);
}

const book_ids_path = process.argv[2];
const reviews_path = process.argv[3];

const num_books = new Set(fs.readFileSync(book_ids_path)
    .toString()
    .split("\n")
    .filter((line) => line.length > 0))
    .size;

const num_reviews = parseInt(execSync(`wc -l < ${reviews_path}`).toString().trim(), 10);

const readInterface = readline.createInterface({
    input: fs.createReadStream(reviews_path),
});

const ids = new Set();
let i = 0;
const handleJSONLine = (json_line) => {
    const { book_id } = JSON.parse(json_line);
    
    ids.add(book_id);

    if (++i == num_reviews) {
        console.info(ids.size / num_books * 100);
    }
}

readInterface.on("line", handleJSONLine);
