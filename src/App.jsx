import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  const handleAddUser = (event) => {
    event.preventDefault()
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    // console.log(email, name);
    const user = { email, name }
    console.log(user);
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        form.reset()
        console.log(data);
      })
  }

  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <>
      <h1>User Management System</h1>
      <h1>Total users: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" required />
        <br />
        <input type="email" name="email" id="" required />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id}: {user.name} {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
