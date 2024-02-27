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



//-------DRIVERS------

//gets all drivers from database
app.get("/drivers",async(req,res)=>{

    try {
        const allData= await db.query(`SELECT * FROM drivers`);

        res.json(allData.rows);
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


//----------TRUCKS--------

//gets all trucks data from database
app.get("/trucks",async(req,res)=>{
    try {
            const response=await db.query(`SELECT * FROM trucks`);
            res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//gets a truck data from database
app.get("/truck/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const response=await db.query("SELECT * FROM trucks WHERE truck_id=($1)",[id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
    
});

//delete a truck data from databse
app.delete("/truck/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await db.query("DELETE FROM trucks WHERE truck_id=($1)",[id])
        res.json({message:"Truck data is deleted sucessfully"});
    } catch (err) {
        console.error(err.message);
    }
   
})



//update truck data 
app.put("/truck/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {brand,model,manufacture_year,truck_plate}=req.body;
        const updatedTruck=await db.query(`UPDATE trucks SET brand= ($1),model=($2),manufacture_year=($3),truck_plate=($4) WHERE truck_id=($5)`
        ,[brand,model,manufacture_year,truck_plate,id]);
    
        res.json({message:"Truck data was updated !!"});
    } catch (err) {
        console.error(err.message);
    }
});

//add new truck data to database
app.post("/submitTruckForm",async(req,res)=>{
    try {
        const {brand,model,manufacture_year,truck_plate}=req.body;
        await db.query(`INSERT INTO trucks (brand,model,manufacture_year,truck_plate) VALUES ($1,$2,$3,$4)`,[brand,model,manufacture_year,truck_plate]);
        res.status(201).send(`Truck data added to the database`);
    } catch (err) {
        console.error(err.message);
    }

})





app.listen(port,()=>{
    console.log(`port is running on ${port}`);
})