import axios from 'axios'
export const saveUserInDB = async user => {
  const { data } = await axios.post(
    'https://assignment-12-server-two-bice.vercel.app/add-users',
    user
  )

  console.log(data)
}