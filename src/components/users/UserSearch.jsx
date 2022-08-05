import React, { useContext } from 'react'
import { useState } from "react";
import AlertContext from '../../context/alert/AlertContext';
import GithubContext from '../../context/github/GithubContext';

function UserSearch() {

    const [text, setText] = useState('');

    const {users, searchUsers, clearUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit= (e) => {
        e.preventDefault();

        if(text === ''){
            setAlert('Search cannot be empty', 'error')
        }else{
            // @todo - Search Users
            searchUsers(text)
            setText('')
        }
        
    }

    const handleClear = () => {
        clearUsers()
    }


  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input 
                            type="text" 
                            name="search" 
                            className='input input-lg pr-40 bg-gray-200 text-black w-full'
                            id="search" 
                            placeholder='Search' 
                            value={text}
                            onChange={handleChange}
                        />

                        <button 
                            type='submit' 
                            className='btn btn-lg absolute top-0 right-0 rounded-l-none w-36'
                        >
                            GO
                        </button>
                    </div>
                </div>
            </form>
        </div>

        { users.length > 0 && <div>
                <button className='btn btn-ghost btn-lg' onClick={handleClear}>Clear</button>
            </div>
        }
    </div>
  )
}

export default UserSearch