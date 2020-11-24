#!/bin/node

const fs = require("fs");
const parse = require("csv-parse/lib/sync");

if (process.argv.length < 5) {
    console.error("Invalid number of arguments");
    console.error("Usage: node merge_schema.js <books csv file> <authors csv file> <reviews csv file>");
    process.exit(1);
}

const getFileLines = (file_path) => fs.readFileSync(file_path).toString().split("\n").filter((line) => line.length > 0);

const books_file_path = process.argv[2];
const authors_file_path = process.argv[3];
const review_file_path = process.argv[4];

const raw_books = getFileLines(books_file_path).slice(1);
const raw_authors = getFileLines(authors_file_path).slice(1);
const raw_reviews = getFileLines(review_file_path);

// build authors map
const authors_map = {};
raw_authors.forEach((entry) => {
    const [name, sex_or_gender, date_of_birth, country_of_citizenship, place_of_birth] = parse(entry, { columns: false })[0];
    const normalized_date_of_birth = date_of_birth.split(",")[0];
    authors_map[name] = {
        name,
        sex_or_gender,
        date_of_birth: normalized_date_of_birth,
        country_of_citizenship,
        place_of_birth
    };
});

// build reviews map
const reviews_map = {};
raw_reviews.forEach((entry) => {
    const { book_id, rating, review_text, date } = JSON.parse(entry);

    if (!reviews_map[book_id]) {
        reviews_map[book_id] = [];
    }

    reviews_map[book_id].push({
        book_id,
        review_rating: rating,
        review_text,
        date
    });
});

const parsed_books = raw_books.map((book) => {
    const [goodreads_book_id, title, raw_authors, isbn, publication_year, language_code, rating] = parse(book, { columns: false })[0];

    const authors_names = raw_authors.split(",").map((name) => name.trim());
    const authors = authors_names.map((name) => authors_map[name] || {
        author_name: name,
        sex_or_gender: "",
        date_of_birth: "",
        country_of_citizenship: "",
        place_of_birth: ""
    });
    const reviews = reviews_map[goodreads_book_id];

    return {
        id: goodreads_book_id,
        title,
        isbn,
        publication_year,
        language_code,
        book_rating: rating,
        // authors,
        "_childDocuments_": reviews
    };
});

console.info(JSON.stringify(parsed_books, null, 2));
