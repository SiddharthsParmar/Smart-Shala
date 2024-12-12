import React from 'react'
import { NavLink } from 'react-router-dom'

const Initial = () => {
  return (
    <>


<div className=' w-screen bg-gray-600 h-screen p-5 '>
<div className="w-full bg-yellow-200 h-full shadow-md flex items-center rounded  justify-center">
<div className=''>
   <NavLink to='/signup/admin'>

   <div className='bg-black text-white shadow-xl px-20 py-5 rounded-full hover:bg-white hover:text-black cursor-pointer '>
    Register
        +
    </div>
   </NavLink> 
    <h2 className='mt-5'>Already have an Account ?? <NavLink to="/commonlogin" className='text-sky-800 mt-3' >
        Login
    </NavLink>
    </h2>
</div>
    
</div>
    
</div>




    </>
  )
}

export default Initial