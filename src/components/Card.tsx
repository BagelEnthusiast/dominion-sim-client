import { MouseEventHandler } from "react";

interface Props {
  name: string,
  quantity: number,
  onHover: MouseEventHandler<HTMLDivElement>
}

export const Card = (props: Props) => {
  return (
    <div>
      <div>{props.quantity} </div>
      <div onMouseOver={props.onHover}>
        {props.name}
      </div>
    </div>
  )
}