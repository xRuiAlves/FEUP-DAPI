INSERT
    INTO Genre (name)
    VALUES ('Horror');

INSERT 
    INTO Saga (name)
    VALUES  ('Spooky');

INSERT 
    INTO Author (name, birth_date, country) 
    VALUES ('Bram Stoker', '1847-11-08', 'Ireland');

INSERT 
    INTO Book (name, rating, isbn, publish_date, origin_lang, saga_id) 
    VALUES ('Dracula', 4, '9780143058106', '1897-05-26', 'en_US', 1);

INSERT 
    INTO Review (content, rating, date, book_id) 
    VALUES ('An amazing book!', 5, '2017-04-10', 1);

INSERT
    INTO BookGenre (book_id, genre_id)
    VALUES (1, 1);

INSERT
    INTO BookAuthor (book_id, author_id)
    VALUES (1, 1);
