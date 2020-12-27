const AUTHORS_CSV_HEADERS = Object.freeze([
    "author_name",
    "sex_or_gender",
    "date_of_birth",
    "country_of_citizenship",
    "place_of_birth",
]);

const BOOKS_CSV_HEADERS = Object.freeze([
    "authors",
    "id",
    "title",
    "isbn",
    "publication_year",
    "language_code",
    "book_rating",
]);

const REVIEWS_CSV_HEADERS = Object.freeze([
    "book_id",
    "book_name",
    "review_rating",
    "review_text",
    "date",
]);

module.exports = {
    AUTHORS_CSV_HEADERS,
    BOOKS_CSV_HEADERS,
    REVIEWS_CSV_HEADERS,
};
