import { useState, useEffect } from 'react'
import { Card } from './components/Card';
import { Strategy } from './interfaces';
import { getCardDataAsync, getUserStrategiesAsync } from './apiCalls';
import { StrategyDisplay } from './components/StrategyDisplay';
import { Chart } from './components/Chart';

export function DeckApp() {
  const [cardList, setCardList] = useState<string[] | undefined>()

  //hard coding default user until login is setup
  const [username, setUsername] = useState('paul')
  const [strategies, setStrategies] = useState <Strategy[] | undefined>()

  useEffect(() => {
    getCardDataAsync()
    .then(cards => { 
      setCardList(cards)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    getUserStrategiesAsync(username)
      .then(strats => {
        setStrategies(strats)
      })
      .catch(err => console.log(err));

  }, [username]);

 
  if (!cardList) {
    return <h1>loading</h1>
  }
  
  return (
    <>
      {strategies && <Chart strategies={strategies} />}
      {
      cardList.map((card, index) => {
        return (
          <span key={`card-${index}`}>
            <Card name={card}></Card>
          </span>
        )
      })
      }
      {
        strategies?.map((strat, index) => {
          return (
            <div key={`strat-${index}`}>
              <StrategyDisplay initialStrategy={strat}/>
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
