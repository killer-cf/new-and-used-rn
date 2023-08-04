import { UserDTO } from "./UserDTO"

export type AdDTO = {
  id: string
  name: string
  accept_trade: boolean
  is_new: boolean
  payment_methods: string[]
  price: number
  product_images: {
    id: string
    path: string
  }[]
  user: UserDTO
}