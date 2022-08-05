import React, { useContext } from 'react'
import { FaTimes } from "react-icons/fa";
import AlertContext from '../../context/alert/AlertContext'

function Alert() {

    const {alert}  = useContext(AlertContext);



  return alert !== null &&  (
    <div className='flex items-start mb-4 space-x-2'>
        {alert.type === 'error' && (
            <div className="bg-red-300 p-1 rounded-box">
                <FaTimes size="1.5rem" className='text-red-600'/>
            </div>
        )}

        <p className='flex-1 text-base font-semibold leading-7 text-white'>
            <strong>{alert.msg}</strong>
        </p>
    </div>
  )
}

export default Alert