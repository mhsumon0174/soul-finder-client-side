import axios from 'axios'
export const saveUserInDB = async user => {
  const { data } = await axios.post(
    'http://localhost:3000/add-users',
    user
  )

  console.log(data)
}