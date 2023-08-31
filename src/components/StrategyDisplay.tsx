import { MouseEventHandler, useCallback, useState } from "react";
import { updateStrategy } from "../apiCalls"
import { Strategy } from "../interfaces"
import { Card } from "./Card"
import '../DeckApp.css'

interface Props {
  initialStrategy: Strategy,
  username: string,
  handleHover: MouseEventHandler<HTMLDivElement>
}

export const StrategyDisplay = (props: Props) => {
  const [strategy, setStrategy] = useState(props.initialStrategy);
  const [open, setOpen] = useState(false)
  //creates stable function reference
  const updateCard = useCallback((arrIndex: number, delta: number) => {
    console.log('update strategy hit')
    strategy.shoppingList[arrIndex].quantity += delta;
    setStrategy({ ...strategy });
    updateStrategy(strategy, props.username)
  }, [strategy]);

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
          <input placeholder="Add Card..."/>
        </div>
      }

    </div>
  )
}

