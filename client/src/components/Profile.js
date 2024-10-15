import React from 'react'

const Profile = ({user}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg ">
        <h2 className='text-2xl font-bold'>{user.name}</h2>
        <p className = "text-xl font-semibold">{user.bio}</p>    
    </div>
  )
}

export default Profile;
