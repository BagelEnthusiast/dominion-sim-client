import { StorageKey } from "../interfaces"
import Cookies from 'js-cookie'

export function useAccount() {
  console.log('cookie info: ', Cookies.get('user'))
  const username = Cookies.get('user')
  //const username = localStorage.getItem(StorageKey.Username)

  return {
    username,
  }
}
