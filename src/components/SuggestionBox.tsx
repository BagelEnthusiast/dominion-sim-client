import { useEffect } from "react";
import styles from "./SuggestionBox.module.css";

interface Props {
  suggestions: string[];
  focus: boolean;
}

export const SuggestionBox = (props: Props) => {
  // const [active, setActive] = useState

  useEffect(() => {}, [focus]);
  return (
    <div className={styles.container}>
      {props.suggestions.map((s) => {
        return <a className="suggestion">{s}</a>;
      })}
    </div>
  );
};
