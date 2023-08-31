import { useState, useEffect, useCallback, FormEvent } from 'react'
import { LibraryCard } from './components/LibraryCard'
import { Strategy, ShoppingListItem } from './interfaces'
import { createStrategy, getCardDataAsync, getUserStrategiesAsync } from './apiCalls'
import { StrategyDisplay } from './components/StrategyDisplay'
import { Chart } from './components/Chart'
import './DeckApp.css'
import { useAccount } from './hooks/useAccount'
import { getGoogleUrl } from './getGoogleUrl'
import { MyModal } from './components/MyModel'
import { v4 as uuidv4 } from 'uuid'
import { CardPreview } from './components/CardPreview'

const isDev = import.meta.env.DEV
const apiUrl = isDev ? 'http://localhost:5173' : 'https://dominion-sim-client.vercel.app/'

interface eventTarget {
  name: { value: string },
  cardList: { value: string }
}

export function DeckApp() {
  console.log('deckApp mounted')
  const [cardList, setCardList] = useState<string[] | undefined>()
  const username = useAccount()
  const [strategies, setStrategies] = useState<Strategy[] | undefined>()
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState('copper')

  const handleCardHover = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // is this better than the unkown casting in handleformsubmit?
    const target = event.target as HTMLDivElement
    if (target.textContent === null) {
      throw new Error('This code should not be accessible')
    }
    setPreview(target.textContent)
  }, [preview])

  const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //try to find alternative to casting here
    const target = event.target as unknown as eventTarget
    if (!strategies) {
      throw new Error('This code should not be accessible')
    }
    const cardStrings = target.cardList.value.split('\n')
    const newShoppingList: ShoppingListItem[] = cardStrings.map(string => {
      return {
        id: uuidv4(),
        card: string.toLowerCase(),
        quantity: 1
      }
    })
    const newStrategy = { 'id': uuidv4(), 'label': target.name.value, 'shoppingList': newShoppingList }
    const newStrategies = [...strategies, newStrategy]
    setStrategies(newStrategies)
    if (!username) {
      throw new Error('This code should not be accessible')
    }
    createStrategy(newStrategy, username)
  }, [strategies, createStrategy, username])

  useEffect(() => {
    getCardDataAsync()
      .then(cards => {
        console.log('card list: ', cards)
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
      {!username && (
        <div className='logged-out-app-container'>

          <a href={getGoogleUrl(`${apiUrl}`)}>Sign in with Google</a>
        </div>
      )
      }
      {username && (
        <div className='logged-in-app-container'>
          {modalOpen && <MyModal
            onExit={() => setModalOpen(false)}
          >
            <div className='modal-form-wrapper'>
              <h1>Add Strategy</h1>
              <form onSubmit={handleFormSubmit}>
                <fieldset>
                  <label>
                    Strategy Name:
                    <input type="text" name="name" defaultValue='New Strategy' />
                  </label>
                  <label>
                    Add Cards:
                    <textarea name="cardList" />
                  </label>
                </fieldset>
                <button type='submit'>Create</button>
              </form>
            </div>
            <button onClick={() => setModalOpen(false)}> X </button>
          </MyModal>
          }
          <div className='app-left-column'>
            <div className='preview-container'>
              {cardList &&
                //placeholder - build card image preview component
                <CardPreview name={preview}/>
              }
            </div>
            <div className='library'>
              {cardList?.map((card, index) => {
                return (
                  <span key={`card-${index}`}>
                    <LibraryCard name={card} onHover={handleCardHover}></LibraryCard>
                  </span>
                )
              })}
            </div>
          </div>
          <div className='chart-container'>
            {strategies &&
              <Chart strategies={strategies} />
            }
          </div>
          <div className='app-right-column'>
            <h1>Strategies</h1>
            <button id='new-strategy-button' onClick={() => setModalOpen(!modalOpen)}> Add Strategy </button>
            <div className="strategies-container">
              {strategies && (
                <div>
                  {strategies.map(strat => {
                    console.log('making a strategy component')
                    return (
                      <div key={strat.id}>
                        <StrategyDisplay initialStrategy={strat} username={username} handleHover={handleCardHover}/>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )
      }
    </div>
  )
}
