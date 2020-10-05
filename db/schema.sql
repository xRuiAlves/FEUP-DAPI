DROP TABLE IF EXISTS BookAuthor;
DROP TABLE IF EXISTS BookGenre;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Saga;

CREATE TABLE Saga (
    id              SERIAL  PRIMARY KEY,
    name            TEXT    NOT NULL
);

CREATE TABLE Book (
    id              SERIAL  PRIMARY KEY,
    name            TEXT    NOT NULL,
    rating          REAL    NOT NULL    DEFAULT 0,
    isbn            TEXT    NOT NULL,
    publish_date    DATE    NOT NULL,
    origin_lang     TEXT    NOT NULL,
    saga_id         INT,

    CONSTRAINT fk_book_saga_id
                    FOREIGN KEY (saga_id)
                    REFERENCES Saga (id)
);

CREATE TABLE Review (
    id              SERIAL  PRIMARY KEY,
    content         TEXT    NOT NULL,
    rating          INT     NOT NULL,
    date            DATE    NOT NULL,
    book_id         INT     NOT NULL,

    CONSTRAINT fk_review_book_id
                    FOREIGN KEY (book_id)
                    REFERENCES Book (id)
);

CREATE TABLE Author (
    id              SERIAL  PRIMARY KEY,
    name            TEXT    NOT NULL,
    birth_date      DATE    NOT NULL,
    country         TEXT    NOT NULL
);

CREATE TABLE Genre (
    id              SERIAL  PRIMARY KEY,
    name            TEXT    NOT NULL
);

CREATE TABLE BookGenre (
    book_id         INT     NOT NULL,
    genre_id        INT     NOT NULL,

    CONSTRAINT fk_book_genre_book_id
                    FOREIGN KEY (book_id)
                    REFERENCES Book (id),

    CONSTRAINT fk_book_genre_genre_id
                    FOREIGN KEY (genre_id)
                    REFERENCES Genre (id),

    PRIMARY KEY(book_id, genre_id)
);

CREATE TABLE BookAuthor (
    book_id         INT     NOT NULL,
    author_id       INT     NOT NULL,

    CONSTRAINT fk_book_author_book_id
                    FOREIGN KEY (book_id)
                    REFERENCES Book (id),

    CONSTRAINT fk_book_author_author_id
                    FOREIGN KEY (author_id)
                    REFERENCES Author (id),

    PRIMARY KEY(book_id, author_id)
);
