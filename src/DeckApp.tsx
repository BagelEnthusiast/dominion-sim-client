import { useState, useEffect } from 'react'
import { Card } from './components/Card';
import { Strategy } from './interfaces';
import { getCardDataAsync, getUserStrategiesAsync } from './apiCalls';
import { StrategyDisplay } from './components/StrategyDisplay';
import { Chart } from './components/Chart';
import './DeckApp.css'
import { useAccount } from './hooks/useAccount';
import { getGoogleUrl } from './getGoogleUrl';

export function DeckApp() {
  const [cardList, setCardList] = useState<string[] | undefined>()
  const username = useAccount()
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

  // const location = useLocation();
  //let from = ((location.state as any)?.from?.pathname as string) || '/';
  
  return (
    <div>
      <a href={getGoogleUrl('http://localhost:5173')}>Sign in with Google</a>
      {(strategies && username) && (
        <>
          <Chart strategies={strategies}/> 
          {strategies.map((strat, index) => { 
            return (
              <div key={`strat-${index}`}>
                <StrategyDisplay initialStrategy={strat} username={username}/>
              </div>
            )
          })}
        </>
      )}
      {cardList?.map((card, index) => {
        return (
          <span key={`card-${index}`}>
            <Card name={card}></Card>
          </span>
        )
      })}
      <div id="strategies-container">
      
        
      
      </div>
    </div>
  )
}
