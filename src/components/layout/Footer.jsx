import React from 'react'
import { BsSnow2 } from "react-icons/bs";

const footerYear = new Date().getFullYear();

function Footer() {
  return (
    <div className='footer bg-gray-700 footer-center'>
        <div className="container mx-auto text-primary-content p-10 ">
            <BsSnow2 className='text-4xl'/>
            <p>Copyright &copy; {footerYear} All right reserved</p>
        </div>
    </div>
  )
}

export default Footer