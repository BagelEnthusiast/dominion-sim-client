export interface CardSet {
  name: string
  cards: Array<string>
}

export interface ShoppingListItem {
  card: string,
  quantity: number
}

export interface Strategy {
  label: string
  shoppingList: ShoppingListItem[]
}

export interface ApiData {
  [user: string]: {
    strategies: Strategy[]
  }
}

export interface CardInfo {
  name: string
}