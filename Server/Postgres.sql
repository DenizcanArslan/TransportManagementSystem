
CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
     birthday_date DATE NOT NULL,
    phone_num VARCHAR(20) NOT NULL,
    driver_license VARCHAR(20) NOT NULL
);

CREATE TABLE trucks (
    truck_id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    manufacture_year INTEGER NOT NULL,
    truck_plate VARCHAR(20) NOT NULL,
);

CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES drivers(driver_id) NOT NULL,
    truck_id INTEGER REFERENCES trucks(truck_id) NOT NULL,
    starting_address VARCHAR(100) NOT NULL,
    end_address VARCHAR(100) NOT NULL,
     start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    yuk VARCHAR(100) NOT NULL
);
