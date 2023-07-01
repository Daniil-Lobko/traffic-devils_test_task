BEGIN;

DELETE FROM book_collection.admin;
DELETE FROM book_collection.user_books;
DELETE FROM book_collection.reviews;
DELETE FROM book_collection.books;
DELETE FROM book_collection.user;
DELETE FROM book_collection.manager;

COMMIT;