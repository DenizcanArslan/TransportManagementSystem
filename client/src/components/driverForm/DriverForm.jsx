"use client"

import {useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2';

const DriverForm = () => {


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


  const handleSubmit = async (e) => {


    try {
      const response = await axios.post('http://localhost:5000/submitDriverForm', formData);
      console.log('Response:', response.data);
      console.log('Driver information submitted successfully');

      const modal=Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Driver information submitted successfully',
        timer:8000,
        timerProgressBar:true
      });

      setTimeout(() => {
        modal.close(); // Modalı kapat
      }, 8000);


    } catch (err) {
      console.error(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer:8000,
        timerProgressBar:true
      });



    }
   
 

  };


  return (
    <div className='container'>

            <form className='row g-4 py-5' onSubmit={handleSubmit}>
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


  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default DriverForm