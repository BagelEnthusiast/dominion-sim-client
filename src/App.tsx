import { useState, useEffect } from 'react'

function App() {
  interface Users {
    name: string
    age: string
  }

  const [list, setList] = useState<string[]>([]);



  function getUsers(): Promise<Users[]> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch('http://localhost:3000/api')
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as Users[]
      })
  }

  useEffect(() => {
    void getUsers()
    .then(users => {
      console.log('users: ', users)
      users.forEach(user => {
        setList(oldArray => [...oldArray, user.name]);
      })
    })
  }, []);

 
  
  return (
    <>
      {list.map((name, index) => {
        return (
          <div key={index}>
            <h2>{name}</h2>
          </div>
        );
      })}
    </>
  )
}

export default App
