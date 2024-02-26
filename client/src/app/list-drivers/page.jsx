import DriverTable from '@/components/driverTable/DriverTable'
import React from 'react'

const listDriversPage = () => {
  return (
    <div className='container-fluid'>
            <h1 className="text-center text-uppercase py-5">Drivers</h1>

      <DriverTable/>
    </div>
  )
}

export default listDriversPage