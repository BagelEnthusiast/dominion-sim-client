import { useCallback, useEffect, useState } from "react";
import { updateStrategy } from "../apiCalls"
import { Strategy } from "../interfaces"
import { Card } from "./Card"
import '../DeckApp.css'

interface Props {
  initialStrategy: Strategy,
  username: string
}

export const StrategyDisplay = (props: Props) => {
  const [strategy, setStrategy] = useState(props.initialStrategy);

  useEffect(() => {
    updateStrategy(strategy, props.username)
      .catch(console.log);
  }, [strategy]);

  //creates stable function reference
  const updateCard = useCallback((arrIndex: number, delta: number) => {
    strategy.shoppingList[arrIndex].quantity += delta;
    setStrategy({ ...strategy });
  }, [strategy]);

  return (
    <div id='strategy-container'>
      <h1>{strategy.label}</h1>
      {strategy.shoppingList.map((shoppingItem, index) => {
        return(
        <div key={`shoppingItem-${index}`}>
          <Card name={shoppingItem.card}></Card>
          <h1>{shoppingItem.quantity}</h1>
          <button onClick={() => updateCard(index, +1)}> + </button>
          <button onClick={() => updateCard(index, -1)}> - </button>
        </div>
        )
      })}
    </div>
  )
}

