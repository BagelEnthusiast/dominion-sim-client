import { useState, useEffect } from 'react'
import { Card } from './components/Card';

interface CardSet {
  name: string
  cards: Array<string>
}

interface ShoppingListItem {
  card: string,
  quantity: number
}

interface Strategy {
  label: string
  shoppingList: ShoppingListItem[]
}

interface ApiData {
  [user: string]: {
    strategies: Strategy[]
  }
}

async function getUserStrategiesAsync(username: string): Promise<Strategy[]> {
  const response = await fetch('http://localhost:3000/api')
  const apiData = (await response.json()) as unknown as ApiData
  return apiData[username].strategies
}

async function getCardDataAsync(): Promise<string[]> {
  const response = await fetch('https://dominion-sim-api.onrender.com/cards')
  const dominionApiData = (await response.json()) as unknown as CardSet[]
  const allCards = dominionApiData.map(cs => cs.cards).flat()
  console.log(allCards)
  return allCards
}

export function DeckApp() {
  const [cardList, setCardList] = useState<string[] | undefined>()

  //hard coding default user until login is setup
  const [username, setUsername] = useState('paul')
  const [strategies, setStrategies] = useState <Strategy[] | undefined>()

  useEffect(() => {
    getUserStrategiesAsync(username)
      .then(strats => {
        setStrategies(strats)
      })
      .catch(err => console.log(err));
    getCardDataAsync()
      .then(cards => { 
        setCardList(cards)
      })
      .catch(err => console.log(err))
  }, []);

 
  if (!cardList) {
    return <h1>loading</h1>
  }
  
  return (
    <>
      {//removed conditional render... do we need it?
      cardList.map((card, index) => {
        return (
          <div key={`card-${index}`}>
            <Card name={card}></Card>
          </div>
        )
      })
      }
      {
        strategies && strategies.map((strat, index) => {
          return (
            <div key={`strat-${index}`}>
              {strat.label}
            </div>
          )
        })
      }
    </>
  )
}

/*
todo
make strategy component
add strategy functionality
*/
