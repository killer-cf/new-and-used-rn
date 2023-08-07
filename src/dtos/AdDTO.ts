import { PaymentMethodsType } from "./PaymentMethodDTO"
import { UserDTO } from "./UserDTO"

export type AdDTO = {
  id: string
  name: string
  accept_trade: boolean
  is_new: boolean
  is_active: boolean
  description: string
  payment_methods: {
    key: PaymentMethodsType,
    name: string
  }[]
  price: number
  product_images: {
    id: string
    path: string
  }[]
  user: UserDTO
  user_id: string
}