#!/bin/node

const fs = require("fs");
const BOOK_IDS_PATH = "./goodreads_book_ids.txt";

if (process.argv.length < 4) {
    console.error("Invalid number of arguments");
    console.error("Usage: node get_intersection_percentage.js <book_ids_file> <reviews_file>");
    process.exit(1);
}

const book_ids_path = process.argv[2];
const reviews_path = process.argv[3];

const book_ids = new Set(fs.readFileSync(book_ids_path)
    .toString()
    .split("\n")
    .filter((line) => line.length > 0));

const reviews = fs.readFileSync(reviews_path)
    .toString()
    .split("\n")
    .filter((line) => line.length > 0);

const num_valid_reviews = reviews.reduce((prev, curr) => prev + (book_ids.has(JSON.parse(curr).book_id) ? 1 : 0), 0);
const intersection_percentage = (num_valid_reviews / reviews.length * 100);

console.info(intersection_percentage.toFixed(2));
