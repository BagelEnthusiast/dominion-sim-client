import { MouseEventHandler } from "react";
import styles from "./LibraryCard.module.css";
import { prettyCard } from "./Card";

interface Props {
  name: string;
  onHover: MouseEventHandler<HTMLDivElement>;
}

export const LibraryCard = (props: Props) => {
  return (
    <div onMouseOver={props.onHover} className={styles.card}>
      {prettyCard[props.name] ?? props.name}
    </div>
  );
};
