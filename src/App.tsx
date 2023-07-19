import { useState, useEffect } from 'react'
import Card from './components/Card';
//import *  as Images from './public/index'

interface ApiData {
  users: User[];
}

interface User {
  name: string
  age: string
}

interface imageComponent {
  default: string
}


async function getUsersAsync(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api')
  const apiData = (await response.json()) as unknown as ApiData
  return apiData.users
}

function App() {
  const [list, setList] = useState<string[] | undefined>();
  const [images, setImages] = useState<imageComponent[] | undefined>()

  useEffect(() => {
    async function importImages() {
      const imagePaths = ['./public/artisan.jpg', './public/bandit.jpg', './public/bureaucrat.jpg', './public/cellar.jpg'];

      const importPromises = imagePaths.map((path) => import(path));
      const importedImages = await Promise.all(importPromises);

      setImages(importedImages);
    }

    void importImages();
    
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
      })
      
      }
      {images && 
      images.map((image, index) => {
        console.log('image inside image map: ', image)
        return (
          <div key={index}>
            <Card imgSrc={image.default}></Card>
          </div>
        )
      })}
      
    </>
  )
}

export default App
