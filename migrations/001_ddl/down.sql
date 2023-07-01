BEGIN;

DROP SCHEMA IF EXISTS book_collection CASCADE;
-- Удаление таблиц
DROP TABLE IF EXISTS book_collection.admin;
DROP TABLE IF EXISTS book_collection.user_books;
DROP TABLE IF EXISTS book_collection.reviews;
DROP TABLE IF EXISTS book_collection.books;
DROP TABLE IF EXISTS book_collection.user;
DROP TABLE IF EXISTS book_collection.manager;

COMMIT;