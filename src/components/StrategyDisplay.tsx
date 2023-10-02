import { MouseEventHandler, useCallback, useState } from "react";
import {
  createShoppingListItem,
  deleteShoppingListItem,
  updateStrategy,
} from "../apiCalls";
import { ShoppingListItem, Strategy } from "../interfaces";
import { Card } from "./Card";
import "../DeckApp.css";
import { v4 as uuidv4 } from "uuid";
import { SuggestionBox } from "./SuggestionBox";

interface Props {
  initialStrategy: Strategy;
  username: string;
  library: string[];
  handleHover: MouseEventHandler<HTMLDivElement>;
}

export const StrategyDisplay = (props: Props) => {
  const [strategy, setStrategy] = useState(props.initialStrategy);
  const [open, setOpen] = useState(false);

  const incrementQuantity = useCallback(
    (arrIndex: number) => {
      const item = strategy.shoppingList[arrIndex];
      //skip zero
      if (item.quantity === -1) {
        item.quantity = 1;
      } else {
        item.quantity += 1;
      }
      setStrategy({ ...strategy });
      updateStrategy(strategy, props.username);
    },
    [strategy]
  );

  const decrementQuantity = useCallback(
    (arrIndex: number) => {
      const item = strategy.shoppingList[arrIndex];
      //skip zero
      if (item.quantity <= 1) {
        item.quantity = -1;
      } else {
        item.quantity -= 1;
      }
      setStrategy({ ...strategy });
      updateStrategy(strategy, props.username); // todo
    },
    [strategy]
  );

  const addCard = useCallback(
    (name: string) => {
      const newItem: ShoppingListItem = {
        id: uuidv4(),
        card: name,
        quantity: 1,
      };
      strategy.shoppingList.push(newItem);
      setStrategy({ ...strategy });
      createShoppingListItem(strategy.id, props.username, newItem);
      //updateStrategy(strategy, props.username)
    },
    [strategy]
  );

  const deleteCard = useCallback(
    (item: ShoppingListItem) => {
      const newShoppingList = strategy.shoppingList.filter(
        (shoppingItem) => shoppingItem.id !== item.id
      );
      const newStrategy: Strategy = strategy;
      newStrategy.shoppingList = newShoppingList;
      setStrategy({ ...newStrategy });
      deleteShoppingListItem(strategy.id, props.username, item);
    },
    [strategy]
  );

  return (
    <div className="strategy-container">
      <h3 className="clickable" onClick={() => setOpen(!open)}>
        {strategy.label}
      </h3>
      {open && (
        <div>
          {strategy.shoppingList.map((shoppingItem, index) => {
            console.log(shoppingItem);
            return (
              <div key={shoppingItem.id}>
                <Card
                  name={shoppingItem.card}
                  quantity={shoppingItem.quantity}
                  onHover={props.handleHover}
                ></Card>
                <button onClick={() => incrementQuantity(index)}> + </button>
                <button onClick={() => decrementQuantity(index)}> - </button>
                <button onClick={() => deleteCard(shoppingItem)}>
                  Delete Card
                </button>
              </div>
            );
          })}
          <SuggestionBox 
            suggestions={props.library} 
            onFinish={card => addCard(card)}
          />
        </div>
      )}
    </div>
  );
};
