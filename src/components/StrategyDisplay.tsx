import { useCallback, useEffect, useState } from "react";
import { updateStrategy } from "../apiCalls"
import { Strategy } from "../interfaces"
import { Card } from "./Card"

interface Props {
  initialStrategy: Strategy
}

export const StrategyDisplay = (props: Props) => {
  const [strategy, setStrategy] = useState(props.initialStrategy);

  useEffect(() => {
    updateStrategy(strategy)
      .catch(console.log);
  }, [strategy]);

  const updateCard = useCallback((arrIndex: number, delta: number) => {
    strategy.shoppingList[arrIndex].quantity += delta;
    setStrategy({ ...strategy });
  }, [strategy]);

  return (
    <span>
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
    </span>
  )
}

