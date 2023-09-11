import { MouseEventHandler } from "react";

interface Props {
  name: string,
  quantity: number,
  onHover: MouseEventHandler<HTMLDivElement>
}

const prettyCard: Record<string, string> = {
  'market': 'Market',
  'council_room': 'Council Room',
};

export const Card = (props: Props) => {
  return (
    <div>
      <div>{props.quantity === -1 ? '∞' : props.quantity} </div>
      <div onMouseOver={props.onHover}>
        {prettyCard[props.name] ?? props.name}
      </div>
    </div>
  )
}