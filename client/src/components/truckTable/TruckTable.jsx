'use client'
import axios from 'axios'
import React,{useState ,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'

import styles from "./truckTable.module.css";

const TruckTable = () => {
    const [TruckData,setTruckData]=useState([]);
    const [TruckId,setTruckId]=useState();//to delete item or to edit item
    
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        manufacture_year: '',
        truck_plate: '',
        
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
    
    //gets all trucks data from database
    const getData=async()=>{
    
        try {   
            const response= await axios.get('http://localhost:5000/trucks');
            const trucksData=response.data;
            setTruckData(trucksData);
        } catch (err) {
            console.error(err.message);
        }
    
    
    }
    
    //deletes driver from database
    const deleteTruck=async(id)=>{
    
        try {
            const response= await axios.delete(`http://localhost:5000/truck/${id}`);
          setTruckData(TruckData.filter((truck)=>truck.truck_id !==id));
          console.log(response.data);
    
        } catch (err) {
            console.error(err.message);
        }
    
        
    }
    
    const getTruck=async(id)=>{
    
        try {
            const response=await axios.get(`http://localhost:5000/truck/${id}`);
            return response.data;
        } catch (err) {
            console.error(err.message);
        }
    
    
    }
    
    const updateTruck=async()=>{
         try {
             const response=await axios.put(`http://localhost:5000/truck/${TruckId}`,formData); 
             console.log(`UPDATE SUCESSFULL; `,response.data);
             getData();
         } catch (err) {
             console.error(err.message);
         }
    }
     
    
    
    
    const handleEditClick = async (id) => {
        try {
          setTruckId(id); // choosen truck id for update data
          const TruckData = await getTruck(id); // choosen truck's data
          
    
          setFormData({
            brand: TruckData.brand,
            model: TruckData.model,
            manufacture_year: TruckData.manufacture_year,
            truck_plate: TruckData.truck_plate,
           
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
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Manufacture Year</th>
                    <th scope="col">Truck Plate</th>
                    
                    <th scope="col">Actions</th>
    
    
                    </tr>
                </thead>
                <tbody>
    
    
                    {TruckData.map(truck=>(
                        <tr key={truck.truck_id} className={styles.trElement}>
                            <td >{truck.truck_id}</td>
                            <td>{truck.brand}</td>
                            <td>{truck.model}</td>
                            <td>{truck.manufacture_year}</td>
                            <td>{truck.truck_plate}</td>
                            <td>
                                <span className={styles.editBtn} data-bs-toggle="modal" data-bs-target="#EditTruck" onClick={() => handleEditClick(truck.truck_id)}>
                                <FontAwesomeIcon icon={faPenToSquare} />  
                                </span>
                                <span className={styles.deleteBtn} data-bs-toggle="modal" data-bs-target="#DeleteDriver" onClick={()=>setTruckId(truck.truck_id)}>
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
              Are you sure you want to delete a truck?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger"  onClick={()=>deleteTruck(TruckId)}  data-bs-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div> 
    
    {/* Edit section */}
    <div className="modal fade" id="EditTruck" tabIndex="-1" aria-labelledby="EditTruck" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="EditTruck">Edit Truck</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
    
          <div className='container'>
    <form className='row g-4 py-5' >
    <div className="col-md-6">
    <label htmlFor="brand" className="form-label">Brand*</label>
    <input type="text" className="form-control" id="brand" required onChange={handleChange} value={formData.brand}/>
    </div>
    <div className="col-md-6">
    <label htmlFor="model" className="form-label">Model*</label>
    <input type="text" className="form-control" id="model" required onChange={handleChange} value={formData.model}/>
    </div>
    
    <div className="col-md-6">
    <label htmlFor="manufacture_year" className="form-label">Manufacture Year*</label>
    <input type="number" className="form-control" id="manufacture_year" required onChange={handleChange} value={formData.manufacture_year}/>
    </div>
    
    <div className="col-md-6">
    <label htmlFor="truck_plate" className="form-label">Truck Plate*</label>
    <input type="text" className="form-control" id="truck_plate" onChange={handleChange} value={formData.truck_plate}/>
    </div>
    
   
    
    
    </form>
    
    </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-success"  onClick={()=>updateTruck()}  data-bs-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div> 
    
    
        </div>
)
}

export default TruckTable