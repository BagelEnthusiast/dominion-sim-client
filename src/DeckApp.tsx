import { useState, useEffect, useCallback, FormEvent } from 'react'
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

interface eventTarget {
  name: {value: string}
}

export function DeckApp() {
  console.log('deckApp mounted')
  const [cardList, setCardList] = useState<string[] | undefined>()
  const username = useAccount()
  const [strategies, setStrategies] = useState <Strategy[] | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('event:', event)
    event.preventDefault();
    //const target: eventTarget = event.target
    if (!strategies) {
      throw new Error('This code should not be accessible')
    }
    const newStrategy: Strategy = { 'label': 'test', 'shoppingList': []}
    const newStrategies: Strategy[] = [newStrategy, ...strategies]
    setStrategies(newStrategies)
    console.log('all strategies: ', strategies)
  }

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
            console.log('strategy in map from deckapp:', strat)
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
          <div className='wrapper'>
            <h1>Add Strategy</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
            <label>
              Strategy Name:
              <input type="text" name="name" defaultValue='New Strategy'/>
            </label>
            </fieldset>
            <button type='submit'>Create</button>
          </form>
          </div>
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
