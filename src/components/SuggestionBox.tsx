import {
  KeyboardEvent,
  useState,
} from "react";
import styles from "./SuggestionBox.module.css";

interface Props {
  suggestions: string[];
  onFinish(winner: string): void;
}

export const SuggestionBox = (props: Props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [newCardInput, setNewCardInput] = useState('')

  const updateSuggestions = (typed: string) => {
    setNewCardInput(typed)
    setItemIndex(0);
    if (typed.length === 0) { 
      setFilteredSuggestions([]);
    } else {
      const newSuggestions = props.suggestions.filter((card) => {
        const substring = card.substring(0, typed.length);
        if (typed === substring) {
          return card;
        } else {
          return;
        }
      });
      setFilteredSuggestions([...newSuggestions]);
      console.log("new suggestions array: ", newSuggestions);
    }
  };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      const sug = filteredSuggestions[itemIndex];
      if (sug) {
        onFinish(sug);

      }
    }

    if (event.key === "ArrowDown") {
      setItemIndex(Math.min(filteredSuggestions.length -1, itemIndex + 1));
    }

    if (event.key === "ArrowUp") {
      setItemIndex(Math.max(0, itemIndex - 1));
    }
  }

  function onFinish(value: string) {
    props.onFinish(value);
    // todo set manage input to empty
    setNewCardInput('')
    setFilteredSuggestions([])
  }

  return (
    <>
      <input
        value={newCardInput}
        onChange={(e) => updateSuggestions(e.target.value)}
        placeholder="Start typing..."
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div className={styles.container}>
        {filteredSuggestions.map((s, si) => {
          const classNames = ['suggestion'];
          if (si === itemIndex) {
            classNames.push('active');
          }
          return <div 
            key={`suggestion-${s}`}
            className={classNames.join(' ')}
            onClick={() => onFinish(s)}
          >{s}</div>;
        })}
      </div>
    </>
  );
};