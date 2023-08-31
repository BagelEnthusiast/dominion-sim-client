import { MouseEventHandler, KeyboardEvent, useCallback, useState } from "react";
import { createShoppingListItem, updateStrategy } from "../apiCalls"
import { ShoppingListItem, Strategy } from "../interfaces"
import { Card } from "./Card"
import '../DeckApp.css'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  initialStrategy: Strategy,
  username: string,
  handleHover: MouseEventHandler<HTMLDivElement>
}

export const StrategyDisplay = (props: Props) => {
  const [strategy, setStrategy] = useState(props.initialStrategy);
  const [open, setOpen] = useState(false)
  const [newCard, setNewCard] = useState('')

  const updateCard = useCallback((arrIndex: number, delta: number) => {
    console.log('update strategy hit')
    strategy.shoppingList[arrIndex].quantity += delta;
    setStrategy({ ...strategy });
    updateStrategy(strategy, props.username)
  }, [strategy]);

  const addCard = useCallback((name: string) => {
    console.log('update strategy hit')
    const newItem: ShoppingListItem = {
      id: uuidv4(),
      card: name,
      quantity: 1
    }
    strategy.shoppingList.push(newItem)
    setStrategy({ ...strategy });
    setNewCard('')
    createShoppingListItem(strategy.id, props.username, newItem)
    //updateStrategy(strategy, props.username)
  }, [strategy]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>, name: string) => {
    if (event.key === 'Enter') {
      addCard(name)
    }
  }, [strategy])
  return (
    <div id='strategy-container'>
      <h3 onClick={() => setOpen(!open)}>{strategy.label}</h3>
      {open &&
        <div>
          <div>
            {strategy.shoppingList.map((shoppingItem, index) => {
              console.log(shoppingItem)
              return (
                <div key={`item-${index}`}>
                  <Card name={shoppingItem.card} quantity={shoppingItem.quantity} onHover={props.handleHover}></Card>
                  <button onClick={() => updateCard(index, +1)}> + </button>
                  <button onClick={() => updateCard(index, -1)}> - </button>
                </div>
              )
            })}
          </div>
          <input
            value={newCard}
            onChange={e => setNewCard(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, newCard)}
            placeholder="Find and add cards..."
          />
          <button onClick={() => addCard(newCard)}>
            +
          </button>
        </div>
      }

    </div>
  )
}

