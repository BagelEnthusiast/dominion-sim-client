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

export interface UserData {
  strategies: Strategy[]
}

export interface ApiData {
  [user: string]: UserData
}

export interface CardInfo {
  name: string
}

export enum StorageKey {
  Username = 'username',
}

export interface JwtPayload {
  email: string
}