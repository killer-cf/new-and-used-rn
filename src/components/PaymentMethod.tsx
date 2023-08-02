import { HStack, Text } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

export type PaymentMethodsType = 'pix' | 'cash' | 'boleto' | 'card' | 'deposit'

type Props = IHStackProps & {
  title: PaymentMethodsType
}

const paymentMethodIcons: Record<PaymentMethodsType, JSX.Element> = {
  pix: <QrCode />,
  cash: <Money />,
  boleto: <Barcode />,
  card: <CreditCard />,
  deposit: <Bank />,
}

const paymentMethodTexts: Record<PaymentMethodsType, string> = {
  pix: 'Pix',
  cash: 'Dinheiro',
  boleto: 'Boleto',
  card: 'Cartão de Crédito',
  deposit: 'Depósito',
}

export function PaymentMethod({ title, ...rest }: Props) {
  return (
    <HStack mb={1} {...rest}>
      {paymentMethodIcons[title]}
      <Text color={"gray.600"} fontSize={'sm'} ml={2}>
        {paymentMethodTexts[title]}
      </Text>
    </HStack>
  )
}