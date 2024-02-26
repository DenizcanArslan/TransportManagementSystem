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

//get a user from database
app.get("/driver/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const driverData= await db.query(`SELECT * FROM drivers WHERE driver_id=($1)`,[id]);
        res.json(driverData.rows);
    } catch (err) {
        console.error(err.message);
    }
})


// deletes a driver from database
app.delete("/drivers/:id",async(req,res)=>{

    try {
        const {id} =req.params;
        const deleteDriver= await db.query(`DELETE FROM drivers WHERE driver_id=($1)`,[id]);
        res.json("driver was deleted !!")
    } catch (err) {
        console.error(err.message);
    }


 
})


//updates a user data in database
app.put("/driver/:id",async (req,res)=>{

  try {
    const {id}=req.params;
    const {driverName,driverSurname,driverBirthday,driverPhoneNumber,driverLicense}=req.body;
    const updatedDriver=await db.query(`UPDATE drivers SET name= ($1),surname=($2),birthday_date=($3), phone_num=($4),driver_license=($5) WHERE driver_id=($6)`
    ,[driverName,driverSurname,driverBirthday,driverPhoneNumber,driverLicense,id]);

    res.json({message:"Driver data was updated !!"});
  } catch (err) {
      console.error(err.message);
  }

})



//add new driver to database
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