import { MouseEventHandler } from "react";

interface Props {
  name: string,
  quantity: number,
  onHover: MouseEventHandler<HTMLDivElement>
}

export const Card = (props: Props) => {
  return (
    <div>
      <div onMouseOver={props.onHover}>
        {props.quantity} {props.name}
      </div>
    </div>
  )
}