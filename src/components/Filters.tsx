import { Checkbox, HStack, Heading, Pressable, Switch, Text, VStack, useTheme, useToast } from "native-base";
import { X } from "phosphor-react-native"
import { FilterTag } from "./FilterTag";
import { Button } from "./Button";
import { Controller, useForm } from "react-hook-form";
import { PaymentMethodsType } from "@dtos/PaymentMethodDTO";
import { FilterParamsData } from "@contexts/FilterModalProvider";
import { useAdFilter } from "@hooks/useAdFilter";

type Props = {
  onCloseModal: () => void
  onSetFilter: (data: FilterParamsData) => void
  filters: FilterParamsData
}

type FilterFormData = {
  state: 'NOVO' | 'USADO'
  accept_trade: boolean
  payment_methods: PaymentMethodsType[]
}

export function Filters({ onCloseModal, onSetFilter, filters }: Props) {
  const { control, handleSubmit, setValue, watch } = useForm<FilterFormData>({
    values: {
      state: filters?.is_new ? 'NOVO' : 'USADO',
      accept_trade: filters?.accept_trade ?? false,
      payment_methods: filters?.payment_methods ?? []
    }
  })

  const state = watch('state')

  const { colors } = useTheme()

  function resetFilters() {
    onSetFilter({} as FilterParamsData)
    onCloseModal()
  }

  async function handleFilter({accept_trade, state, payment_methods}: FilterFormData) {
    const params = {
      accept_trade,
      payment_methods,
      is_new: state === 'NOVO' ? true : false,
    }

    onCloseModal()
    onSetFilter(params)
  }

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
        <FilterTag title="NOVO" mr={2} selected={state === 'NOVO'} onPress={() => setValue('state', 'NOVO')} />
        <FilterTag title="USADO" selected={state === 'USADO'} onPress={() => setValue('state', 'USADO')}/>
      </HStack>

      <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
        Aceita troca?
      </Heading>
      <Controller 
        name='accept_trade'
        control={control}
        render={({ field: { value, onChange }}) => (
          <Switch onTrackColor={"lightBlue.500"} value={value} onValueChange={onChange}/>
        )}
      />

      <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
        Meios de pagamento aceitos
      </Heading>
      <Controller 
        name='payment_methods'
        control={control}
        render={({ field: { value, onChange }}) => (
          <Checkbox.Group defaultValue={[]} value={value} onChange={onChange} flex={1} accessibilityLabel="selecione os meios de pagamento aceitos">
            <HStack alignItems={"center"} mb={2}>
              <Checkbox  value="boleto" accessibilityLabel="Boleto?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
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
              <Checkbox  value="card" accessibilityLabel="cartão de crédito?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
              <Text ml={2} fontFamily={"body"} fontSize={"md"}>Cartão de crédito</Text>
            </HStack>

            <HStack alignItems={"center"} mb={2}>
              <Checkbox  value="deposit" accessibilityLabel="Deposito bancário?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
              <Text ml={2} fontFamily={"body"} fontSize={"md"}>Deposito bancário</Text>
            </HStack>
          </Checkbox.Group>
        )}
      />

      <HStack mb={5}>
        <Button text={'Resetar filtros'} onPress={resetFilters} flex={1} mr={3} buttonColor="white-gray"/>
        <Button text={'Aplicar filtros'} onPress={handleSubmit(handleFilter)} flex={1} buttonColor="gray"/>
      </HStack>
    </VStack>
  )
}