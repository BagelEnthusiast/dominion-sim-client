import styles from './LibraryCard.module.css'

interface Props {
    name: string,
  }
  
  export const LibraryCard = (props: Props) => {
    // const srcUrl = `cards/${props.name}.jpg`;
    return (
        // <img src={srcUrl} style={{
        //   height: '200px',
        // }}/>
        <div className={styles.card}>
          {props.name}
        </div>
    )
  }