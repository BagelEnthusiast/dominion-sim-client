import { useState, useEffect } from 'react'
import { Card } from './components/Card';
import { Strategy } from './interfaces';
import { getCardDataAsync, getUserStrategiesAsync } from './apiCalls';
import { StrategyDisplay } from './components/StrategyDisplay';
import { Chart } from './components/Chart';
import './Deckapp.css'
import { SigninButton } from './components/SigninButton';
import { useAccount } from './hooks/useAccount';

export function DeckApp() {
  const [cardList, setCardList] = useState<string[] | undefined>()
  const { username } = useAccount()
  const [strategies, setStrategies] = useState <Strategy[] | undefined>()

  useEffect(() => {
    getCardDataAsync()
    .then(cards => { 
      setCardList(cards)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (username === null) return 
    getUserStrategiesAsync(username)
      .then(strats => {
        setStrategies(strats)
      })
      .catch(err => console.log(err));

  }, [username]);
  
  return (
    <div>
      {<SigninButton/>}
      {strategies && <Chart strategies={strategies} />}
      {
      cardList?.map((card, index) => {
        return (
          <span key={`card-${index}`}>
            <Card name={card}></Card>
          </span>
        )
      })
      }
      <div id="strategies-container">
      {
        strategies?.map((strat, index) => {
          return (
            <div key={`strat-${index}`}>
              <StrategyDisplay initialStrategy={strat}/>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
