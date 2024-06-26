-- INPUT
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  message_addresses TEXT[] NOT NULL
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  author_id INTEGER, -- no FK b/c ordering of disperate message types not guaranteed
  content TEXT NOT NULL
);

-- OUTPUT
CREATE TABLE user_summary (
  user_id INTEGER PRIMARY KEY,
  favorite_words TEXT[] NOT NULL,
  post_count INTEGER NOT NULL
);