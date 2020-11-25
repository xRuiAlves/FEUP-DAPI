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

const parsed_entities = [];

// create books map
const books_map = {};
raw_books.forEach((entry) => {
    const [goodreads_book_id, title] = parse(entry, { columns: false })[0];
    books_map[goodreads_book_id] = title;
})

// authors
raw_authors.forEach((entry) => {
    const [name, sex_or_gender, date_of_birth, country_of_citizenship, place_of_birth] = parse(entry, { columns: false })[0];
    const normalized_date_of_birth = date_of_birth.split(",")[0];
    parsed_entities.push({
        author_name: name,
        sex_or_gender,
        date_of_birth: normalized_date_of_birth,
        country_of_citizenship,
        place_of_birth,
        entity_type: "author",
    });
});

// reviews
raw_reviews.forEach((entry) => {
    const { book_id, rating, review_text, date } = JSON.parse(entry);
    parsed_entities.push({
        book_id,
        book_name: books_map[book_id],
        review_rating: rating,
        review_text,
        date,
        entity_type: "review",
    });
});

// books
raw_books.forEach((book) => {
    const [goodreads_book_id, title, authors, isbn, publication_year, language_code, rating] = parse(book, { columns: false })[0];
    parsed_entities.push({
        authors,
        id: goodreads_book_id,
        title,
        isbn,
        publication_year,
        language_code,
        book_rating: rating,
        entity_type: "book",
    });
});

console.info(JSON.stringify(parsed_entities, null, 2));
