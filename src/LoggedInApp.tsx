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
import { EventTarget } from "./DeckApp";

export function LoggedInApp({ username }: { username: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardList, setCardList] = useState<string[] | undefined>();
  const [strategies, setStrategies] = useState<Strategy[] | undefined>();
  const [preview, setPreview] = useState("copper");
  const [invalidStrings, setInvalidStrings] = useState<string[]>([]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //try to find alternative to casting here
      const target = event.target as unknown as EventTarget;
      if (!strategies || !cardList) {
        throw new Error("This code should not be accessible");
      }
      const cardStrings = target.cardList.value.trim().split("\n").map(s => s.trim()).filter(s => s !== '');
      const invalidArr = cardStrings.filter((string) => {
        return !cardList.includes(string);
      });
      setInvalidStrings([...invalidArr]);
      console.log(invalidStrings);
      if (invalidArr.length > 0) {
        console.log("invalid strings: ", invalidArr);
        return;
      }

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
      setModalOpen(false);
    },
    [strategies, username, cardList]
  );

  const handleDeleteStrategy = useCallback((strategyId: string) => {
    console.log("hitting delete handler");
    deleteStrategy(strategyId, username);
    //why is this bad and the other method correct?
    // setStrategies(strategies?.filter((s) => s.id !== strategyId))
    setStrategies((prior) => prior?.filter((s) => s.id !== strategyId));
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
            {invalidStrings &&
              invalidStrings.map((s) => {
                return (
                  <div key={uuidv4()}>
                    <p>{`${s}\n`}</p>
                  </div>
                );
              })}
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
      <div className="column app-left-column">
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
      <div className="column chart-container">
        {strategies && <Chart strategies={strategies} />}
      </div>
      <div className="column app-right-column">
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
