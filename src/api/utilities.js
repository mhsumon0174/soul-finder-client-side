import axios from 'axios'
import { use } from 'react'
import { AuthContext } from '../provider/AuthContext'
export const saveUserInDB = async user => {
  
  const { data } = await axios.post(
    'https://assignment-12-server-two-bice.vercel.app/add-users',
    user
  )

  console.log(data)
}