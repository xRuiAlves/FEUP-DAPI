#!/bin/node

/**
 * Compute the percentage of reviews from a reviews dataset that intersect with books from a books dataset
 */

const fs = require("fs");
const readline = require("readline");
const { execSync } = require("child_process");

if (process.argv.length < 4) {
    console.error("Invalid number of arguments");
    console.error("Usage: node reviews_intersection_percentage.js <book_ids_file> <reviews_file>");
    process.exit(1);
}

const book_ids_path = process.argv[2];
const reviews_path = process.argv[3];

const book_ids = new Set(fs.readFileSync(book_ids_path)
    .toString()
    .split("\n")
    .filter((line) => line.length > 0));

const num_reviews = parseInt(execSync(`wc -l < ${reviews_path}`).toString().trim(), 10);

const readInterface = readline.createInterface({
    input: fs.createReadStream(reviews_path),
});

let i = 0;
let num_valid_reviews = 0;
const handleJSONLine = (json_line) => {
    const { book_id } = JSON.parse(json_line);
    
    if (book_ids.has(book_id)) {
        ++num_valid_reviews;
    }

    ++i;

    if (i == num_reviews) {
        const intersection_percentage = (num_valid_reviews / num_reviews * 100);

        console.info(JSON.stringify({
            num_reviews: num_reviews,
            num_intersected_reviews: num_valid_reviews,
            intersection_percentage: parseFloat(intersection_percentage.toFixed(2)),
        }, null, 4));
    }
}

readInterface.on("line", handleJSONLine);
