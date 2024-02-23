import express from "express";
import db from "./dbConnection.js";
import bodyParser from "body-parser";
import cors from "cors";
const app=express();
const port=5000;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// connection for database
try {
    db.connect();
    console.log(`Database is connected`)
} catch (error) {
    console.log(error);
}



//gets all drivers from database
app.get("/drivers",async(req,res)=>{

    try {
        const allData= await db.query(`SELECT * FROM drivers`);

        res.json(allData.rows);
        console.log(allData.rows);
    } catch (err) {
            console.error(err.message);
    }

});

app.post("/submitDriverForm", async(req,res)=>{

    try {
        const {driverName,driverSurname,driverBirthday, driverPhoneNumber,driverLicense}=req.body;

        await db.query(`INSERT INTO drivers (name ,surname ,birthday_date ,phone_num ,driver_license) VALUES ($1,$2,$3,$4,$5)`,
        [driverName, driverSurname, driverBirthday, driverPhoneNumber, driverLicense]);
        
        res.status(201).send('Driver information added to the database');
    


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }

});




app.listen(port,()=>{
    console.log(`port is running on ${port}`);
})