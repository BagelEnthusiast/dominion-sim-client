import { MouseEventHandler, KeyboardEvent, useCallback, useState } from "react";
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
  const [newCard, setNewCard] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

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
      setNewCard("");
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, name: string) => {
      if (event.key === "Enter") {
        addCard(name);
      }
    },
    [strategy]
  );

  const updateSuggestions = (event: any) => {
    console.log("on change event: ", event);
    console.log("type of event: ", typeof event);
    if (!props.library) {
      throw new Error("This code should not be accessible");
    }
    const newSuggestions = props.library.filter((card) => {
      const substring = card.substring(0, event.length);
      if (event === substring) {
        return card;
      } else {
        return;
      }
    });
    setFilteredSuggestions([...newSuggestions]);
    setNewCard(event);
    console.log("new suggestions array: ", newSuggestions);
  };

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
          <div className="input-container">
            <div>
              <input
                value={newCard}
                onChange={(e) => updateSuggestions(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, newCard)}
                placeholder="Find and add cards..."
              />
              {newCard !== "" && (
                <SuggestionBox suggestions={filteredSuggestions} />
              )}
            </div>
            <button onClick={() => addCard(newCard)}> Add </button>
          </div>
        </div>
      )}
    </div>
  );
};
