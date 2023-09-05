import { useState, useEffect, useCallback, FormEvent } from "react";
import { LibraryCard } from "./components/LibraryCard";
import { Strategy, ShoppingListItem } from "./interfaces";
import {
  createStrategy,
  deleteStrategy,
  getCardDataAsync,
  getUserStrategiesAsync,
} from "./apiCalls";
import { StrategyDisplay } from "./components/StrategyDisplay";
import { Chart } from "./components/Chart";
import { MyModal } from "./components/MyModel";
import { v4 as uuidv4 } from "uuid";
import { CardPreview } from "./components/CardPreview";
import { eventTarget } from "./DeckApp";

export function LoggedInApp({ username }: { username: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardList, setCardList] = useState<string[] | undefined>();
  const [strategies, setStrategies] = useState<Strategy[] | undefined>();
  const [preview, setPreview] = useState("copper");

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //try to find alternative to casting here
      const target = event.target as unknown as eventTarget;
      if (!strategies) {
        throw new Error("This code should not be accessible");
      }
      const cardStrings = target.cardList.value.split("\n");
      const newShoppingList: ShoppingListItem[] = cardStrings.map((string) => {
        return {
          id: uuidv4(),
          card: string.toLowerCase(),
          quantity: 1,
        };
      });
      const newStrategy = {
        id: uuidv4(),
        label: target.name.value,
        shoppingList: newShoppingList,
      };
      const newStrategies = [...strategies, newStrategy];
      setStrategies(newStrategies);
      createStrategy(newStrategy, username);
    },
    [strategies, createStrategy, username]
  );

  const handleDeleteStrategy = useCallback((strategyId: string) => {
    console.log("hitting delete handler");
    deleteStrategy(strategyId, username);
    //why is this bad and the other method correct?
    //setStrategies(strategies?.filter((s) => s.id !== strategyId))
    setStrategies((prior) => prior?.filter((s) => s.id !== strategyId));
  }, []);

  useEffect(() => {
    console.log(username)
    console.log(handleDeleteStrategy);
  }, []);

  const handleCardHover = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // is this better than the unkown casting in handleformsubmit?
      const target = event.target as HTMLDivElement;
      if (target.textContent === null) {
        throw new Error("This code should not be accessible");
      }
      setPreview(target.textContent);
    },
    [preview]
  );

  useEffect(() => {
    getCardDataAsync()
      .then((cards) => {
        console.log("card list: ", cards);
        setCardList(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUserStrategiesAsync(username)
      .then((strats) => {
        setStrategies(strats);
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <div className="logged-in-app-container">
      {modalOpen && (
        <MyModal onExit={() => setModalOpen(false)}>
          <div className="modal-form-wrapper">
            <h1>Add Strategy</h1>
            <form onSubmit={handleFormSubmit}>
              <fieldset>
                <label>
                  Strategy Name:
                  <input type="text" name="name" defaultValue="New Strategy" />
                </label>
                <label>
                  Add Cards:
                  <textarea name="cardList" />
                </label>
              </fieldset>
              <button type="submit">Create</button>
            </form>
          </div>
          <button onClick={() => setModalOpen(false)}> X </button>
        </MyModal>
      )}
      <div className="app-left-column">
        <div className="preview-container">
          {cardList && (
            //placeholder - build card image preview component
            <CardPreview name={preview} />
          )}
        </div>
        <div className="library">
          {cardList?.map((card, index) => {
            return (
              <div key={`card-${index}`}>
                <LibraryCard
                  name={card}
                  onHover={handleCardHover}
                ></LibraryCard>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chart-container">
        {strategies && <Chart strategies={strategies} />}
      </div>
      <div className="app-right-column">
        <h1>Strategies</h1>
        <button
          id="new-strategy-button"
          onClick={() => setModalOpen(!modalOpen)}
        >
          {" "}
          Add Strategy{" "}
        </button>
        <div className="strategies-container">
          {strategies && (
            <div>
              {strategies.map((strat) => {
                console.log("making a strategy component");
                return (
                  <div key={strat.id}>
                    <StrategyDisplay
                      initialStrategy={strat}
                      username={username}
                      handleHover={handleCardHover}
                    />
                    <button onClick={() => handleDeleteStrategy(strat.id)}>
                      Delete Strategy
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
