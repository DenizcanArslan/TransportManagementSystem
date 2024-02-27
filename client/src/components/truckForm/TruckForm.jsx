"use client"
import axios from 'axios';
import {useState} from 'react'
import Swal from 'sweetalert2';

const TruckForm = () => {

    const [formData,setFormData]=useState({
        brand:'',
        model:'',
        manufacture_year:'',
        truck_plate:'',
    });

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }


    const handleSubmit=async(e)=>{
        try {
            
       
            const response=await axios.post('http://localhost:5000/submitTruckForm', formData);
            console.log(`Response: ${response.data}`);
            console.log(`Truck information submitted successfully`);
            const modal=Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Truck information submitted successfully',
                timer:8000,
                timerProgressBar:true
              });
        
              setTimeout(() => {
                modal.close(); // Modalı kapat
              }, 8000);
            } 
              catch (err) {
                console.error(err.message);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  timer:8000,
                  timerProgressBar:true
                });
            }
    }

  return (
    
        <div className='container'>
    
                <form className='row g-4 py-5' onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="brand" className="form-label">Truck Brand*</label>
        <input type="text" className="form-control" id="brand" required onChange={handleChange} value={formData.brand}/>
      </div>
      <div className="col-md-6">
        <label htmlFor="model" className="form-label">Truck model*</label>
        <input type="text" className="form-control" id="model" required onChange={handleChange} value={formData.model}/>
      </div>
    
      <div className="col-md-6">
        <label htmlFor="manufacture_year" className="form-label">Manufacture year*</label>
        <input type="number" className="form-control" id="manufacture_year" required onChange={handleChange} value={formData.manufacture_year}/>
      </div>

      <div className="col-md-6">
        <label htmlFor="truck_plate" className="form-label">Truck plate*</label>
        <input type="text" className="form-control" id="truck_plate" required onChange={handleChange} value={formData.truck_plate}/>
      </div>
    
  
    
    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    
        </div>
      )
  
}

export default TruckForm