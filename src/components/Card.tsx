interface CardInfo {
  name: string
}

export const Card = (props: CardInfo) => {
  const srcUrl = `cards/${props.name}.jpg`;
  return (
    <div>
      <img src={srcUrl}/>
    </div>
  )
}