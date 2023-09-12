import { MouseEventHandler } from "react";

interface Props {
  name: string,
  quantity: number,
  onHover: MouseEventHandler<HTMLDivElement>
}

export const prettyCard: Record<string, string> = {
  'copper': 'Copper',
  'silver': 'Silver',
  'gold': 'Gold',
  'estate': 'Estate',
  'duchy': 'Duchy',
  'province': 'Province',
  'curse': 'Curse',
  'chapel': 'Chapel',
  'village': 'Village',
  'moneylender': 'Moneylender',
  'poacher': 'Poacher',
  'smithy': 'Smithy',
  'council_room': 'Council Room',
  'festival': 'Festival',
  'laboratory': 'Laboratory',
  'library': 'Library',
  'market': 'Market',
  'mine': 'Mine'
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