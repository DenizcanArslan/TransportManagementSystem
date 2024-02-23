import pg from "pg";

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"TransportManagementSystem",
    password:"Denizcan.7",
    port:5432
});

export default db;