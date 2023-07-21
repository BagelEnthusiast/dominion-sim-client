import { useState, useEffect } from 'react'
import { Card } from './components/Card';

interface ApiData {
  users: User[];
}

interface User {
  name: string
  age: string
}

interface CardSet {
  name: string
  cards: Array<string>
}


async function getUsersAsync(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api')
  const apiData = (await response.json()) as unknown as ApiData
  return apiData.users
}

async function getCardDataAsync(): Promise<string[]> {
  const response = await fetch('https://dominion-sim-api.onrender.com/cards')
  const dominionApiData = (await response.json()) as unknown as CardSet[]
  const allCards = dominionApiData.map(cs => cs.cards).flat();
  console.log(dominionApiData)
  return allCards
}

export function DeckApp() {
  const [list, setList] = useState<string[] | undefined>();
  const [cardList, setCardList] = useState<string[] | undefined>();

  useEffect(() => {
    getUsersAsync()
      .then(users => {
        const names = users.map(u => u.name);
        setList(names);
      })
      .catch(err => console.log(err));
    getCardDataAsync()
      .then(cards => { 
        setCardList(cards)
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
          <div key={`list-${index}`}>
            <h2>{name}</h2>
          </div>
        );
      })
      
      }
      {cardList && cardList.map((card, index) => {
        return (
          <div key={`card-${index}`}>
            <Card name={card}></Card>
          </div>
        )
      })}
    </>
  )
}


// const obj: any = {
//   "paul": {
//     "strategies": [{
//       "label": 'bigmoney',
//       "shoppingList": [
//         { card: 'Province', quantity: 12, },
//         { card: 'Gold', quantity: 10, },
//         { card: 'Silver', quantity: 10, },
//       ],
//     }, {
//       "label": 'chapel shit',
//       "shoppingList": [
//         { card: 'Chapel', quantity: 1, },
//         { card: 'Province', quantity: 12, },
//         { card: 'Gold', quantity: 10, },
//         { card: 'Silver', quantity: 10, },],
//     }],
//   },
//   "nathan": {
//     "strategies": [{
//       "label": 'gold',
//       "shoppingList": [],
//     }],
//   },
// }