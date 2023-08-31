import { MouseEventHandler } from 'react'
import styles from './LibraryCard.module.css'

interface Props {
    name: string,
    onHover: MouseEventHandler<HTMLDivElement>
  }
  
  export const LibraryCard = (props: Props) => {
    // const srcUrl = `cards/${props.name}.jpg`;
    return (
        // <img src={srcUrl} style={{
        //   height: '200px',
        // }}/>
        <div onMouseOver={props.onHover} className={styles.card}>
          {props.name}
        </div>
    )
  }