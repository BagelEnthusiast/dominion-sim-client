import { CardInfo } from "../interfaces";

interface Props {
  name: string
}

export const Card = (props: Props) => {
  const srcUrl = `cards/${props.name}.jpg`;
  return (
    <div>
      <img src={srcUrl}/>
    </div>
  )
}