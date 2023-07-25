import { Strategy } from "../interfaces"

interface Props {
  strategy: Strategy
}

export const StrategyDisplay = (props: Props) => {
  return (
    <div>
      <h1>{props.strategy.label}</h1>
      {/* {props.strategy.shoppingList.map((card, index) => {
        
      })} */}
    </div>
  )
}
