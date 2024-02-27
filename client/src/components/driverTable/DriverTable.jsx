'use client'
import axios from 'axios'
import React,{useState ,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'


import styles from "./driverTable.module.css";

const DriverTable = () => {

const [DriverData,setDriverData]=useState([]);
const [DriverId,setDriverId]=useState();//to delete item or to edit item

const [formData, setFormData] = useState({
    driverName: '',
    driverSurname: '',
    driverBirthday: '',
    driverPhoneNumber: '',
    driverLicense: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


//gets all drivers from database
const getData=async()=>{

    try {   
        const response= await axios.get('http://localhost:5000/drivers');
        const driversData=response.data;
        setDriverData(driversData);
    } catch (err) {
        console.error(err.message);
    }


}

//deletes driver from database
const deleteUser=async(id)=>{

    try {
        const response= await axios.delete(`http://localhost:5000/drivers/${id}`);
      setDriverData(DriverData.filter((driver)=>driver.driver_id !==id));
      console.log(response.data);

    } catch (err) {
        console.error(err.message);
    }

    
}

const getUser=async(id)=>{

    try {
        const response=await axios.get(`http://localhost:5000/driver/${id}`);
        return response.data[0];
    } catch (err) {
        console.error(err.message);
    }


}

const updateUser=async()=>{
     try {
         const response=await axios.put(`http://localhost:5000/driver/${DriverId}`,formData); 
         console.log(`UPDATE SUCESSFULL; `,response.data);
         getData();
     } catch (err) {
         console.error(err.message);
     }
}
 



const handleEditClick = async (id) => {
    try {
      setDriverId(id); // choosen driver id for update data
      const driverData = await getUser(id); // choosen driver's data
      const birthDate = new Date(driverData.birthday_date);
      const formattedBirthday = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;

      setFormData({
        driverName: driverData.name,
        driverSurname: driverData.surname,
        driverBirthday: formattedBirthday,
        driverPhoneNumber: driverData.phone_num,
        driverLicense: driverData.driver_license
      });
    } catch (err) {
      console.error(err.message);
    }
  };




useEffect(()=>{
getData();
},[]);


  return (

    

    <div className='container-fluid'>
        <table className="table table-striped">
                        <thead >
                <tr>
                <th scope="col" className={styles.tHeader}>#ID</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Birthday</th>
                <th scope="col">Phone Num:</th>
                <th scope="col">Driver License</th>
                <th scope="col">Actions</th>


                </tr>
            </thead>
            <tbody>


                {DriverData.map(driver=>(
                    <tr key={driver.driver_id} className={styles.trElement}>
                        <td >{driver.driver_id}</td>
                        <td>{driver.name}</td>
                        <td>{driver.surname}</td>
                        <td>{new Date(driver.birthday_date).toLocaleDateString()}</td>
                        <td>{driver.phone_num}</td>
                        <td>{driver.driver_license}</td>
                        <td>
                            <span className={styles.editBtn} data-bs-toggle="modal" data-bs-target="#EditDriver" onClick={() => handleEditClick(driver.driver_id)}>
                            <FontAwesomeIcon icon={faPenToSquare} />  
                            </span>
                            <span className={styles.deleteBtn} data-bs-toggle="modal" data-bs-target="#DeleteDriver" onClick={()=>setDriverId(driver.driver_id)}>
                            <FontAwesomeIcon icon={faTrashCan}/> 
                            </span>
                       
                                          
                    
                        </td>
                    </tr>
                ))
                
                
                }
                
           
            </tbody>
        </table>

{/* Delete section */}
        <div className="modal fade" id="DeleteDriver" tabIndex="-1" aria-labelledby="DeleteDriver" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="DeleteDriver">Delete User</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          Are you sure you want to delete a driver?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-danger"  onClick={()=>deleteUser(DriverId)}  data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div> 

{/* Edit section */}
<div className="modal fade" id="EditDriver" tabIndex="-1" aria-labelledby="EditDriver" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="EditDriver">Edit User</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <div className='container'>
<form className='row g-4 py-5' >
<div className="col-md-6">
<label htmlFor="driverName" className="form-label">Driver's name*</label>
<input type="text" className="form-control" id="driverName" required onChange={handleChange} value={formData.driverName}/>
</div>
<div className="col-md-6">
<label htmlFor="driverSurname" className="form-label">Driver's Surname*</label>
<input type="text" className="form-control" id="driverSurname" required onChange={handleChange} value={formData.driverSurname}/>
</div>

<div className="col-md-6">
<label htmlFor="driverBirthday" className="form-label">Driver's birthday*</label>
<input type="date" className="form-control" id="driverBirthday" required onChange={handleChange} value={formData.driverBirthday}/>
</div>

<div className="col-md-6">
<label htmlFor="driverPhoneNumber" className="form-label">Driver's Phone number</label>
<input type="tel" className="form-control" id="driverPhoneNumber" onChange={handleChange} value={formData.driverPhoneNumber}/>
</div>

<div className="col-md-6">
<label htmlFor="driverLicense" className="form-label">Driver License*</label>
<input type="text" className="form-control" id="driverLicense" required onChange={handleChange} value={formData.driverLicense}/>
</div>


</form>

</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-success"  onClick={()=>updateUser()}  data-bs-dismiss="modal">Update</button>
      </div>
    </div>
  </div>
</div> 


    </div>
  )
}

export default DriverTable