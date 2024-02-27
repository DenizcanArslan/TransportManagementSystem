import TruckForm from '@/components/truckForm/TruckForm';
import React from 'react'

const addTruckPage = () => {
  return (
    <div className='container'>
      <h1 className="text-center text-uppercase pt-5">Add New Truck</h1>
      <TruckForm/>
    </div>
  )
}

export default addTruckPage;