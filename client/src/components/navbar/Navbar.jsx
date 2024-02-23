"use client"
import { useEffect } from 'react';

import Image from 'next/image';


import styles from "./navbar.module.css";
import DropdownLi from './dropdownLi';
import DropdownSpan from './DropdownSpan';



const Navbar = () => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);
 
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid ">
      <a className="navbar-brand" href="/">
        <Image src={"/images/DcaTransportLogo.png"} alt="Logo" width={200} height={60}/>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNavDropdown">
        <ul className={`navbar-nav ${styles.navbar}`} >
          <li className="nav-item">
          <span>
          <a className={`nav-link ${styles.navHomeBtn}`} aria-current="page" href="/">Home</a>

          </span>
          </li>

          <li className="nav-item dropdown">
            <DropdownSpan buttonText={"Drivers"}/>
            <ul className="dropdown-menu">
               <DropdownLi hrefLink={"add-driver"} hrefText={"Add driver"}/>
               <DropdownLi hrefLink={"list-drivers"} hrefText={"List all drivers"}/>
            </ul>
          </li>

          <li className="nav-item dropdown">
          <DropdownSpan buttonText={"Trucks"}/>
            <ul className="dropdown-menu">
            <DropdownLi hrefLink={"add-truck"} hrefText={"Add new truck"}/>
            <DropdownLi hrefLink={"list-trucks"} hrefText={"List all trucks"}/>
            </ul>
          </li>

          <li className="nav-item dropdown">
          <DropdownSpan buttonText={"Trips"}/>
            <ul className="dropdown-menu">
            <DropdownLi hrefLink={"add-trip"} hrefText={"Add new trip"}/>
               <DropdownLi hrefLink={"list-trips"} hrefText={"List all trips"}/>
            </ul>
          </li>

          
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar