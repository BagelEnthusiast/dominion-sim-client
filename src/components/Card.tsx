import React from 'react'

interface cardInfo {
  imgSrc: string
}

const Card = (props: cardInfo) => {
  return (
    <div>
      <img src={props.imgSrc}></img>
    </div>
  )
}

export default Card