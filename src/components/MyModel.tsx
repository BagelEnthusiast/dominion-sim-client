import React from 'react';
import styles from './MyModal.module.css';

export function MyModal(props: {
  onExit(): void;
} & React.PropsWithChildren) {
  return (
    <div 
      className={styles.MyModalOuter}
      onClick={() => props.onExit()}
    >
      <div 
        className={styles.MyModalInner}
        onClick={evt => evt.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}
