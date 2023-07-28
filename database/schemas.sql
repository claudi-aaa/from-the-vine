CREATE DATABASE vineapp;


CREATE TABLE users (
    username VARCHAR(18), 
    email VARCHAR(254) NOT NULL UNIQUE, 
    password VARCHAR(120) NOT NULL, 
    acc_created TIMESTAMP,
    PRIMARY KEY(username)
);

-- unhashed users dummy user data 

INSERT INTO users(username, email, password, acc_created) VALUES ('mikey', 'mikey@gmail.com', 'Password1!', CURRENT_TIMESTAMP); 

INSERT INTO users(username, email, password, acc_created) VALUES ('lizzie', 'lizzie@gmail.com', 'Password1!', CURRENT_TIMESTAMP); 

INSERT INTO users(username, email, password, acc_created) VALUES ('ringobingo', 'ringobingo@hotmail.com', 'Password1!', CURRENT_TIMESTAMP); 

INSERT INTO users(username, email, password, acc_created) VALUES ('test', 'test@outlook.com', 'Password1!', CURRENT_TIMESTAMP); 



CREATE TABLE notes (
    username VARCHAR(18) REFERENCES users(username),
    wname VARCHAR(180) NOT NULL,
    wyear CHAR(4) NOT NULL,
    winery VARCHAR(100) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    color VARCHAR(15) NOT NULL,
    berry SMALLINT,
    citrus SMALLINT,
    stone_fruit SMALLINT,
    grassy SMALLINT,
    floral SMALLINT,
    spicy SMALLINT,
    mineral SMALLINT,
    sweet SMALLINT,
    sour SMALLINT,
    woody SMALLINT,
    tannic SMALLINT,
    content VARCHAR(3000) NOT NULL,
    post_id VARCHAR(255),
    date_posted TIMESTAMP,
    PRIMARY KEY(username, post_id)
);


-- DUMMY DATA notes

INSERT INTO notes(username, wname, wyear, winery, origin, color, berry, citrus, stone_fruit, grassy, floral, spicy, mineral, sweet, sour, woody, tannic, content, post_id, date_posted) VALUES ('mikey', 'Bask Rose', '2015', 'Bask Winery', 'Canada', 'rose', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 'Sugar-free but flavor-FUL', '075df763-85ed-41cb-8bd2-2d0163c06176', CURRENT_TIMESTAMP);

INSERT INTO notes(username, wname, wyear, winery, origin, color, berry, citrus, stone_fruit, grassy, floral, spicy, mineral, sweet, sour, woody, tannic, content, post_id, date_posted) VALUES ('mikey', 'Rioja Reserva', '2016', 'Campo Viejo', 'Spain', 'red', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 'Sugar-free but flavor-FUL', 'a585193a-b75b-4a14-ab21-8ee69ce74c74', CURRENT_TIMESTAMP);



