--------------------------------------------------
----------------- BEGIN DDL-----------------------
--------------------------------------------------
DROP TABLE IF EXISTS
    app_user,
    app_role,
    app_user_role
CASCADE;

CREATE TABLE membership (
    id serial PRIMARY KEY,
    tier VARCHAR(16) NOT NULL,
    price DECIMAL NOT NULL,
    weekly_visits INTEGER NOT NULL
);

CREATE TABLE app_user (
    id serial PRIMARY KEY,
    membership_id INTEGER NOT NULL REFERENCES membership(id),
    email VARCHAR(128) NOT NULL UNIQUE,
    password_hash VARCHAR(2048) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    address VARCHAR(128) NOT NULL,
    city VARCHAR(64) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code CHAR(5) NOT NULL,
    disabled boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE app_role (
    id serial PRIMARY KEY,
    app_role_name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE app_user_role (
    app_user_id INTEGER NOT NULL REFERENCES app_user(id),
    app_role_id INTEGER NOT NULL REFERENCES app_role(id),
    PRIMARY KEY (app_role_id, app_user_id)
);
--------------------------------------------------
------------------ END DDL------------------------
--------------------------------------------------

--------------------------------------------------
----------------- BEGIN DML-----------------------
--------------------------------------------------
INSERT INTO membership(tier, price, weekly_visits) VALUES
    ('GOLD', 100.00, 7),
    ('SILVER', 66.00, 5),
    ('BRONZE', 33.00, 3);

INSERT INTO app_role (app_role_name) VALUES
    ('USER'),
    ('ADMIN');

INSERT INTO app_user (membership_id, email, password_hash, first_name, last_name,
                        phone, address, city, state, zip_code) VALUES
    (1, 'me@michaelarnold.io', 'NOTAPASSWORDHASH', 'Michael', 'Arnold',
    '951-768-2490', '777 Lucky St', 'Georgetown', 'TX', '78626'),
    (2, 'example@test.com', 'NOTAPASSWORDHASH', 'Example', 'Test',
    '555-555-5555', '789 Fresh Ave', 'Corvallis', 'OR', '97333'),
    (3, 'test@example.com', 'NOTAPASSWORDHASH', 'Test', 'Example',
    '000-000-0000', '3993 Peppertree Ln', 'Chino', 'CA', '91760');

-- me@michaelarnold.io: ADMIN
-- example@test.com: USER
-- test@example.com: USER
INSERT INTO app_user_role (app_user_id, app_role_id) VALUES
    (1, 1),
    (2, 2),
    (3, 2);

--------------------------------------------------
------------------ END DML------------------------
--------------------------------------------------