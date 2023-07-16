import { Checkbox, HStack, Heading, Pressable, Switch, Text, VStack, useTheme } from "native-base";
import { X } from "phosphor-react-native"
import { FilterTag } from "./FilterTag";
import { useState } from "react";
import { Button } from "./Button";

type Props = {
  onCloseModal: () => void
}

type FilterStateType = 'NOVO' | 'USADO'

export function Filters({ onCloseModal}: Props) {
  const { colors } = useTheme()
  const [ state, setState] = useState<FilterStateType>('NOVO')

  return (
    <VStack bg={"gray.200"} p={6} flex={1}>
      <HStack justifyItems={"center"} justifyContent={"space-between"} >
        <Heading fontSize={'xl'} mb={6} color={"gray.700"} fontFamily={"heading"}>
          Filtrar anúncios
        </Heading>
        <Pressable onPress={onCloseModal}>
          <X color={colors.gray[400]}/>
        </Pressable>
      </HStack>    

      <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} >
        Condição
      </Heading>
      <HStack pt={3}>
        <FilterTag title="NOVO" mr={2} selected={state === 'NOVO'} onPress={() => setState('NOVO')} />
        <FilterTag title="USADO" selected={state === 'USADO'} onPress={() => setState('USADO')}/>
      </HStack>

      <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
        Aceita troca?
      </Heading>
      <Switch onTrackColor={"lightBlue.500"} />

      <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
        Meios de pagamento aceitos
      </Heading>
      <Checkbox.Group flex={1} accessibilityLabel="selecione os meios de pagamento aceitos">
        <HStack alignItems={"center"} mb={2}>
          <Checkbox  value="ticket" accessibilityLabel="Boleto?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
          <Text ml={2} fontFamily={"body"} fontSize={"md"}>Boleto</Text>
        </HStack>
        
        <HStack alignItems={"center"} mb={2}>
          <Checkbox  value="pix" accessibilityLabel="Pix?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
          <Text ml={2} fontFamily={"body"} fontSize={"md"}>Pix</Text>
        </HStack>

        <HStack alignItems={"center"} mb={2}>
          <Checkbox  value="cash" accessibilityLabel="Dinheiro?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
          <Text ml={2} fontFamily={"body"} fontSize={"md"}>Dinheiro</Text>
        </HStack>

        <HStack alignItems={"center"} mb={2}>
          <Checkbox  value="credit_card" accessibilityLabel="cartão de crédito?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
          <Text ml={2} fontFamily={"body"} fontSize={"md"}>Cartão de crédito</Text>
        </HStack>

        <HStack alignItems={"center"} mb={2}>
          <Checkbox  value="deposit" accessibilityLabel="Deposito bancário?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
          <Text ml={2} fontFamily={"body"} fontSize={"md"}>Deposito bancário</Text>
        </HStack>
      </Checkbox.Group>

      <HStack mb={5}>
        <Button text={'Resetar filtros'} flex={1} mr={3} buttonColor="white-gray"/>
        <Button text={'Aplicar filtros'} flex={1} buttonColor="gray"/>
      </HStack>
    </VStack>
  )
}