import { useState, useEffect, useCallback } from 'react'
import { Card } from './components/Card'
import { Strategy } from './interfaces'
import { getCardDataAsync, getUserStrategiesAsync } from './apiCalls'
import { StrategyDisplay } from './components/StrategyDisplay'
import { Chart } from './components/Chart'
import './DeckApp.css'
import { useAccount } from './hooks/useAccount'
import { getGoogleUrl } from './getGoogleUrl'
import { MyModal } from './components/MyModel'

const isDev = import.meta.env.DEV
const apiUrl = isDev ? 'http://localhost:5173' : 'https://dominion-sim-client.vercel.app/'

export function DeckApp() {
  const [cardList, setCardList] = useState<string[] | undefined>()
  const username = useAccount()
  const [strategies, setStrategies] = useState <Strategy[] | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  const handleNewStrategy = useCallback((l: string) => {
    if (!strategies) {
      throw new Error('This code should not be accessible')
    }
    
    const newStrategy: Strategy = { 'label': l, 'shoppingList': []}

    //why can't I use the spread stynax here?
    const newStrategies: Strategy[] = [newStrategy, ...strategies]

    setStrategies(newStrategies)
  }, [strategies])

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
      <a href={getGoogleUrl(`${apiUrl}`)}>Sign in with Google</a>
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
      {/* <NewStrategyButton/> */}
      <button id='new-strategy-button' onClick={() => setModalOpen(!modalOpen)}> Add Strategy </button>
      {modalOpen && <MyModal
        onExit={() => setModalOpen(false)}
        >
          <form onSubmit={() => handleNewStrategy('input')}>
            <label>
              Strategy Name:
              <input type="text" name="name" defaultValue='New Strategy'/>
            </label>
            <input type='submit' value='submit'/>
          </form>
          <button onClick={() => setModalOpen(false)}> X </button>
        </MyModal>
      }
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
