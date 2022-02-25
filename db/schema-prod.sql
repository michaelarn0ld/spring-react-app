--------------------------------------------------
----------------- BEGIN DDL-----------------------
--------------------------------------------------
DROP TABLE IF EXISTS
    app_user,
    app_role,
    app_user_role,
    membership,
    reservation,
    reservable,
    facility,
    equipment 
CASCADE;

CREATE TABLE membership (
    id SERIAL PRIMARY KEY,
    tier VARCHAR(16) NOT NULL,
    price DECIMAL NOT NULL,
    weekly_visits INTEGER NOT NULL
);

CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    membership_id INTEGER NOT NULL REFERENCES membership(id),
    email VARCHAR(128) NOT NULL UNIQUE,
    username VARCHAR(32) NOT NULL UNIQUE,
    password_hash VARCHAR(2048) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    address VARCHAR(128) NOT NULL,
    city VARCHAR(64) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code CHAR(5) NOT NULL,
    disabled BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE app_role (
    id SERIAL PRIMARY KEY,
    app_role_name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE app_user_role (
    app_user_id INTEGER NOT NULL REFERENCES app_user(id),
    app_role_id INTEGER NOT NULL REFERENCES app_role(id),
    PRIMARY KEY (app_role_id, app_user_id)
);

CREATE TABLE reservable (
    id SERIAL PRIMARY KEY,
    reservable_name VARCHAR(32) NOT NULL
);

CREATE TABLE facility (
    id SERIAL PRIMARY KEY,
    facility_name VARCHAR(32) NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL
);

CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    facility_id INTEGER NOT NULL REFERENCES facility(id),
    reservable_id INTEGER NOT NULL REFERENCES reservable(id)
);


CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER NOT NULL REFERENCES equipment(id),
    app_user_id INTEGER NOT NULL REFERENCES app_user(id),
    start_time TIMESTAMP  NOT NULL,
    end_time TIMESTAMP NOT NULL
);
--------------------------------------------------
------------------ END DDL------------------------
--------------------------------------------------

--------------------------------------------------
----------------- BEGIN DML-----------------------
--------------------------------------------------
INSERT INTO membership (tier, price, weekly_visits) VALUES
    ('GOLD', 100.00, 7),
    ('SILVER', 50.00, 5),
    ('BRONZE', 25.00, 3);

INSERT INTO app_role (app_role_name) VALUES
    ('USER'),
    ('ADMIN');

INSERT INTO app_user (membership_id, email, username, password_hash, first_name, last_name,
                        phone, address, city, state, zip_code) VALUES
    (1, 'me@michaelarnold.io', 'michaelarn0ld', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'Michael', 'Arnold',
    '951-768-2490', '777 Lucky St', 'Georgetown', 'TX', '78626'),
    (2, 'example@test.com', 'example123', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'Example', 'Test',
    '555-555-5555', '789 Fresh Ave', 'Corvallis', 'OR', '97333'),
    (3, 'test@example.com', 'test456', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'Test', 'Example',
    '000-000-0000', '3993 Peppertree Ln', 'Chino', 'CA', '91760');

-- me@michaelarnold.io: USER, ADMIN
-- example@test.com: USER
-- test@example.com: USER
INSERT INTO app_user_role (app_user_id, app_role_id) VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (3, 1);

INSERT INTO reservable (reservable_name) VALUES
    ('Bench Press'),
    ('Squat Rack'),
    ('Lane');

INSERT INTO facility (facility_name, open_time, close_time) VALUES
    ('Weight Room', '06:00:00', '23:00:00'),
    ('Pool', '05:00:00', '20:00:00'),
    ('Track','05:00:00', '22:00:00');

INSERT INTO equipment (facility_id, reservable_id) VALUES
    (1, 1), -- Weight Room, Bench
    (1, 1), -- Weight Room, Bench
    (1, 2), -- Weight Room, Squat
    (2, 3), -- Pool, Lane
    (2, 3), -- Pool, Lane
    (2, 3), -- Pool, Lane
    (3, 3), -- Track, Lane
    (3, 3); -- Track, Lane

INSERT INTO reservation (equipment_id, app_user_id,
                            start_time, end_time) VALUES
    (1, 1, '2022-02-22 06:30:00', '2022-02-22 07:30:00'),
    (1, 1, '2022-02-23 06:30:00', '2022-02-23 07:30:00'),
    (2, 2, '2022-02-22 07:00:00', '2022-02-22 08:00:00'),
    (2, 3, '2022-02-22 08:15:00', '2022-02-22 09:15:00'),
    (3, 2, '2022-02-22 08:00:00', '2022-02-22 09:00:00'),
    (4, 2, '2022-02-23 11:00:00', '2022-02-23 12:00:00'),
    (7, 2, '2022-02-23 12:00:00', '2022-02-23 13:00:00');
--------------------------------------------------
------------------ END DML------------------------
--------------------------------------------------
