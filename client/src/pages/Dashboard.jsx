import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { selectUser } from '../features/auth/authSlice'

export const Dashboard = () => {

  const user = localStorage.getItem('user-name');
  console.log(user)

  return (
    <div>
      <h1>Hello {user}</h1>
    </div>
  )
}
