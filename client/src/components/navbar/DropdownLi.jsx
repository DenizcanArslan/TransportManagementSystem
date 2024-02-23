"use client"
import Link from "next/link";
import {useEffect} from "react";

import styles from "./navbar.module.css";


const DropdownLi = ({hrefLink,hrefText}) => {

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);

  return (
    <li className={styles.liElement}>
    <Link href={hrefLink}> {hrefText} </Link>
    </li>
  )
}

export default DropdownLi;