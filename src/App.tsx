import { useState, useEffect } from 'react'

interface ApiData {
  users: User[];
}

interface User {
  name: string
  age: string
}

async function getUsersAsync(): Promise<User[]> {
  // For now, consider the data is stored on a static `users.json` file
  const response = await fetch('http://localhost:3000/api')
  const apiData = (await response.json()) as unknown as ApiData
  return apiData.users
}

function App() {

  const [list, setList] = useState<string[] | undefined>();

  useEffect(() => {
    console.log('useEffect');
    getUsersAsync()
      .then(users => {
        const names = users.map(u => u.name);
        setList(names);
      })
      .catch(err => console.log(err));
  }, []);

 
  if (!list) {
    return <h1>loading</h1>;
  }
  
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
