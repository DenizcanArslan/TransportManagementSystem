import { Inter } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dca Transport & Logistics",
  description: "Transport & Logistics Management System",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en">

      <body className={inter.className} >
      <Navbar/>
      {children}
      </body>
    </html>
  
  );
}
