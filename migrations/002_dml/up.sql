BEGIN;

DELETE FROM book_collection.admin;
DELETE FROM book_collection.user_books;
DELETE FROM book_collection.reviews;
DELETE FROM book_collection.books;
DELETE FROM book_collection.user;
DELETE FROM book_collection.manager;

SELECT * FROM book_collection.admin;

SELECT * FROM book_collection.manager;

SELECT * FROM book_collection.user;

SELECT * FROM book_collection.books;

SELECT * FROM book_collection.user_books;

SELECT * FROM book_collection.reviews;

DROP FUNCTION IF EXISTS insert_admin(name VARCHAR(30), password VARCHAR(30));
DROP FUNCTION IF EXISTS insert_manager(name VARCHAR(30), password VARCHAR(30));
DROP FUNCTION IF EXISTS insert_user(name VARCHAR(30), password VARCHAR(30), manager_id INTEGER);
DROP FUNCTION IF EXISTS insert_book(title VARCHAR(30), description TEXT, author VARCHAR(30));
DROP FUNCTION IF EXISTS delete_book(del_book_id INT);
DROP FUNCTION IF EXISTS insert_user_book(user_id INTEGER, book_id INTEGER);
DROP FUNCTION IF EXISTS insertUserBookByUserName(book_title VARCHAR, name VARCHAR);
DROP FUNCTION IF EXISTS insert_review(book_id INTEGER, review_text TEXT, review_rate INTEGER);
DROP PROCEDURE IF EXISTS addUserBookByUserName(book_title VARCHAR, book_description TEXT, name VARCHAR);

CREATE OR REPLACE FUNCTION insert_admin(name VARCHAR(30), password VARCHAR(30))
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.admin (name, password) VALUES (name, password);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_manager(name VARCHAR(30), password VARCHAR(30))
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.manager (name, password) VALUES (name, password);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_user(name VARCHAR(30), password VARCHAR(30), manager_id INTEGER)
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.user (name, password, manager_id) VALUES (name, password, manager_id);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS insert_book(title VARCHAR(30), description TEXT, author VARCHAR(30));

CREATE OR REPLACE FUNCTION insert_book(title VARCHAR(30), description TEXT, author VARCHAR(30))
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.books (title, description, author) VALUES (title, description, author);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_book(del_book_id INT)
    RETURNS VOID AS $$
BEGIN
    DELETE FROM book_collection.user_books WHERE book_id = del_book_id;
    DELETE FROM book_collection.reviews WHERE book_id = del_book_id;
    DELETE FROM book_collection.books WHERE id = del_book_id;
END;
$$ LANGUAGE plpgsql;

DELETE FROM book_collection.books where id = 16;

CREATE OR REPLACE FUNCTION insert_user_book(user_id INTEGER, book_id INTEGER)
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.user_books (user_id, book_id) VALUES (user_id, book_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertUserBookByUserName(book_title VARCHAR, name VARCHAR)
    RETURNS VOID AS $$
DECLARE
    user_id INTEGER;
    book_id INTEGER;
BEGIN

    SELECT id INTO user_id
    FROM book_collection."user" as u
    WHERE u.name = name;

    SELECT id INTO book_id
    FROM book_collection.books as b
    WHERE b.title = book_title;

    INSERT INTO book_collection.user_books (user_id, book_id)
    VALUES (user_id, book_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_review(book_id INTEGER, review_text TEXT, review_rate INTEGER)
    RETURNS VOID AS $$
BEGIN
    INSERT INTO book_collection.reviews (book_id, review_text, review_rate) VALUES (book_id, review_text, review_rate);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addUserBookByUserName(book_title VARCHAR, book_description TEXT, user_name VARCHAR)
AS $$
DECLARE
    user_id INTEGER;
    book_id INTEGER;
BEGIN
    PERFORM insert_book(book_title, book_description, user_name);

    SELECT u.id INTO user_id
    FROM book_collection."user" as u
    WHERE u.name = user_name;

    SELECT b.id INTO book_id
    FROM book_collection.books as b
    WHERE b.title = book_title;

    PERFORM insert_user_book(user_id, book_id);

END;
$$ LANGUAGE plpgsql;


--------------------------------------------------
-- Вставка тестовых данных в таблицу "admin"
SELECT insert_admin('Admin 1', 'admin123');
SELECT insert_admin('Admin 2', 'admin456');
SELECT insert_admin('Admin 3', 'admin789');

-- Вставка тестовых данных в таблицу "manager"
SELECT insert_manager('Manager 1', 'manager123');
SELECT insert_manager('Manager 2', 'manager456');
SELECT insert_manager('Manager 3', 'manager789');

-- Вставка тестовых данных в таблицу "user"
SELECT insert_user('User 1', 'user123', 1);
SELECT insert_user('User 2', 'user456', 1);
SELECT insert_user('User 3', 'user789', 2);

-- Вставка тестовых данных в таблицу "books"
SELECT insert_book('Book 1', 'Description 1', 'Author1' );
SELECT insert_book('Book 2', 'Description 2', 'Author2');
SELECT insert_book('Book 3', 'Description 3', 'Author3');

-- Вставка тестовых данных в таблицу "user_books"
SELECT insert_user_book(1, 1);
SELECT insert_user_book(1, 2);
SELECT insert_user_book(2, 1);

-- Вставка тестовых данных в таблицу "reviews"
SELECT insert_review(1, 'Review 1', 2);
SELECT insert_review(1, 'Review 2', 10);
SELECT insert_review(2, 'Review 3', 5);

COMMIT;