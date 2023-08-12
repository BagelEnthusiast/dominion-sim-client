import { StorageKey } from "../interfaces"
import Cookies from 'js-cookie'
import * as jose from 'jose'
import { JwtPayload } from "../interfaces"



export function useAccount() {
  //this does not work
  if (!Cookies.get('access-token')) return null

  // this is bad, should be a check if cookie exists
  const token: string = Cookies.get('access-token') as string
  // console.log('cookie info: ', Cookies.get('user'))

  //found jose.decodeJwt on these docs: https://github.com/panva/jose/blob/e2836e6aaaddecde053018884abb040908f186fd/docs/functions/util_decode_jwt.decodeJwt.md
  const payload: JwtPayload = jose.decodeJwt(token) as unknown as JwtPayload
  console.log('payload: ', payload)
  const username = payload.email
  console.log('username:', username)

  //const username = Cookies.get('user')
  //const username = localStorage.getItem(StorageKey.Username)

  return username
}
