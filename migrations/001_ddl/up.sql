BEGIN;

DROP SCHEMA IF EXISTS book_collection CASCADE;
-- Удаление таблиц
DROP TABLE IF EXISTS book_collection.admin;
DROP TABLE IF EXISTS book_collection.user_books;
DROP TABLE IF EXISTS book_collection.reviews;
DROP TABLE IF EXISTS book_collection.books;
DROP TABLE IF EXISTS book_collection.user;
DROP TABLE IF EXISTS book_collection.manager;

CREATE SCHEMA IF NOT EXISTS book_collection;

CREATE TABLE IF NOT EXISTS book_collection.admin (
                                       id SERIAL PRIMARY KEY,
                                       name VARCHAR(30) NOT NULL,
                                       password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS book_collection.manager (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(30) NOT NULL,
                         password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS book_collection.user (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       manager_id INTEGER REFERENCES book_collection.manager(id)
);

CREATE TABLE IF NOT EXISTS book_collection.books (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(30) NOT NULL,
                       description TEXT NOT NULL,
                       author VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS book_collection.user_books (
                            user_id INTEGER REFERENCES book_collection.user(id),
                            book_id INTEGER REFERENCES book_collection.books(id),
                            PRIMARY KEY (user_id, book_id)
);

CREATE TABLE IF NOT EXISTS book_collection.reviews (
                         id SERIAL PRIMARY KEY,
                         book_id INTEGER REFERENCES book_collection.books(id),
                         review_text TEXT NOT NULL,
                         review_rate NUMERIC NOT NULL CHECK ( review_rate >= 0 AND review_rate <= 10 )
);


COMMIT;




