# to-do-app

CREATE TABLE todolist (
id SERIAL PRIMARY KEY,
description VARCHAR(300) NOT NULL,
status VARCHAR(20) NOT NULL
);

INSERT INTO todolist (description, status)
VALUES ('Finish homework', 'incomplete'),
('Feed dog', 'complete');
