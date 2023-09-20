import styles from "./SuggestionBox.module.css";

interface Props {
    suggestions: string[]
}

export const SuggestionBox = (props: Props) => {
  return (
    <div className={styles.container}>
        {props.suggestions.map(s => {
            return (
                <div>{s}</div>
            )
        })}
    </div>
  )
}