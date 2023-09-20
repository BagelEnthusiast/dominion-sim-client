interface Props {
    name: string,
}

const uglyCard: Record<string, string> = {
    'Copper': 'copper',
    'Silver': 'silver',
    'Gold': 'gold',
    'Estate': 'estate',
    'Duchy': 'duchy',
    'Province': 'province',
    'Curse': 'curse',
    'Chapel': 'chapel',
    'Village': 'village',
    'Moneylender': 'moneylender',
    'Poacher': 'poacher',
    'Smithy': 'smithy',
    'Council Room': 'council_room',
    'Festival': 'festival',
    'Laboratory': 'laboratory',
    'Library': 'library',
    'Market': 'market',
    'Mine': 'mine'
  };

export const CardPreview = (props: Props) => {
    const srcUrl = `cards/${uglyCard[props.name] ?? props.name}.jpg`;
    return (
        <img src={srcUrl} style={{
            height: '200px',
        }} />
    )
}