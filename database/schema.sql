CREATE DATABASE js_user_auth_lab;

\c js_user_auth_lab

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password_digest TEXT,
  balance INTEGER
);
