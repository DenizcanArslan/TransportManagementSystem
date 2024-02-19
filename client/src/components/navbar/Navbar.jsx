"use client"
import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';


import styles from "./navbar.module.css";



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
            <span className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Drivers
            </span>
            <ul className="dropdown-menu">
              <li className={styles.liElement}>
               <Link href={"/add-driver"}> Add new driver </Link>
               </li>
               <li className={styles.liElement}>
               <Link href={"/list-drivers"}> List all drivers </Link>
               </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <span className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Trucks
            </span>
            <ul className="dropdown-menu">
            <li className={styles.liElement}>
               <Link href={"/add-truck"}> Add new truck </Link>
               </li>
               <li className={styles.liElement}>
               <Link href={"/list-trucks"}> List all trucks </Link>
               </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <span className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Trips
            </span>
            <ul className="dropdown-menu">
            <li className={styles.liElement}>
               <Link href={"/add-trip"}> Add new trip </Link>
               </li>
               <li className={styles.liElement}>
               <Link href={"/list-trips"}> List all trips </Link>
               </li>
            </ul>
          </li>

          
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar