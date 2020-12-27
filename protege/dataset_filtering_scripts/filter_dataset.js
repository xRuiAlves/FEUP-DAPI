#!/bin/node

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const { AUTHORS_CSV_HEADERS, REVIEWS_CSV_HEADERS, BOOKS_CSV_HEADERS } = require("./csv_headers");

const arrToCsv = (arr) => arr.map(elem => `"${elem}"`).join(",");

const VALID_OUTPUT_ENTITIES = Object.freeze({
    BOOKS: "books",
    AUTHORS: "authors",
    REVIEWS: "reviews"
});

if (process.argv.length < 6) {
    console.error("Invalid number of arguments");
    console.error("Usage: node filter_datasets.js <books csv file> <authors csv file> <reviews csv file> <output entities>");
    process.exit(1);
}

const getFileLines = (file_path) => fs.readFileSync(file_path).toString().split("\n").filter((line) => line.length > 0);

const books_file_path = process.argv[2];
const authors_file_path = process.argv[3];
const review_file_path = process.argv[4];
const output_entities = process.argv[5];

if (!(new Set(Object.values(VALID_OUTPUT_ENTITIES)).has(output_entities))) {
    console.error("Invalid output entity specified! Must be one of the following:")
    Object.values(VALID_OUTPUT_ENTITIES).forEach(e => console.error(`\t${e}`))
    process.exit(2);
}

const raw_books = getFileLines(books_file_path).slice(1);
const raw_authors = getFileLines(authors_file_path).slice(1);
const raw_reviews = getFileLines(review_file_path);

const authors_map = new Map()
const books_map = new Map()
const book_to_reviews_map = new Map()

// authors
raw_authors.forEach((entry) => {
    const [name, sex_or_gender, date_of_birth, country_of_citizenship, place_of_birth] = parse(entry, { columns: false })[0];
    const normalized_date_of_birth = date_of_birth.split(",")[0];

    authors_map.set(name, {
        author_name: name,
        sex_or_gender,
        date_of_birth: normalized_date_of_birth,
        country_of_citizenship,
        place_of_birth,
    });
});

// books
raw_books.forEach((book) => {
    const [goodreads_book_id, title, authors, isbn, publication_year, language_code, rating] = parse(book, { columns: false })[0];
    const author = authors.split(", ")[0]

    const book_obj = {
        author,
        id: goodreads_book_id,
        title,
        isbn,
        publication_year,
        language_code,
        book_rating: rating,
    };

    books_map.set(book_obj.id, book_obj)
});

// reviews
raw_reviews.forEach((entry) => {
    const { book_id, rating, review_text, date } = JSON.parse(entry);
    const review_obj = {
        book_id,
        book_name: books_map.get(book_id).title,
        review_rating: rating,
        review_text,
        date,
    };

    if (!book_to_reviews_map.has(book_id)) {
        book_to_reviews_map.set(book_id, new Set())
    }
    book_to_reviews_map.get(book_id).add(review_obj)
    
});

const isBookValid = (book) => {
    if (!(
        book_to_reviews_map.has(book.id) && 
        book_to_reviews_map.get(book.id).size >= 12
    )) {
        return false;
    }

    if (!authors_map.has(book.author)) {
        return false;
    }

    return true;
}

const books = 
    [...books_map.values()]
    .filter(book => isBookValid(book))
    .slice(0, 10)

const authors = [...new Set(books
    .map(book => book.author))]
    .map(author => authors_map.get(author))

const reviews = books
    .map(book => [...book_to_reviews_map.get(book.id)])
    .flatMap(reviews_list => reviews_list.slice(0, 6 + Math.floor(3 * Math.random())))

switch(output_entities) {
    case VALID_OUTPUT_ENTITIES.BOOKS: 
        console.info(arrToCsv(BOOKS_CSV_HEADERS));
        books.forEach(book => console.info(arrToCsv(Object.values(book))));
        break;
    case VALID_OUTPUT_ENTITIES.AUTHORS:
        console.info(arrToCsv(AUTHORS_CSV_HEADERS));
        authors.forEach(author => console.info(arrToCsv(Object.values(author))));
        break;
    case VALID_OUTPUT_ENTITIES.REVIEWS:
        console.info(arrToCsv(REVIEWS_CSV_HEADERS));
        reviews.forEach(review => console.info(arrToCsv(Object.values(review))));
        break;
}
