import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Checkbox, FormControl, HStack, Heading, Icon, Image, Pressable, Radio, ScrollView, Switch, Text, TextArea, VStack, useTheme } from "native-base";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form";

import { Header } from "@components/Header";
import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import ProductImage from "@assets/product.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { formatCurrency } from "@utils/formatCurrency";

type AdFormParams = {
  id: string
  name: string
}

const adFormSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  description: yup.string().required('Informe a descrição do produto').min(10, 'Descrição deve ter um mínimo de 10 caracteres'),
  state: yup.string().oneOf(['new_product', 'used_product']).required('Selecione o estado do produto'),
  price: yup.string().required('Informe o preço do produto'),
  accept_trade: yup.boolean().required(),
  payment_methods: yup.array(yup.string().required()).required('Informe ao menos 1 método de pagamento')
})

type AdFormData = yup.InferType<typeof adFormSchema>

export function AdForm() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdFormData>({
    resolver: yupResolver(adFormSchema)
  })

  const route = useRoute()
  const { colors } = useTheme()
  
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const params  = route.params as AdFormParams

  function handleGoPreview(data: AdFormData) {
    // navigation.navigate('pre_ad')
    console.log(data)
  }

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
      <Header title={`${params ? 'Editar' : 'Criar'} anúncio`} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40}} showsVerticalScrollIndicator={false}>
        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Imagens
        </Heading>
        <Text color={"gray.500"} fontSize={'sm'}>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <HStack mt={3}>
          <Box w={25} h={25} rounded={"lg"} overflow={"hidden"} mr={2}>
            <Image 
              source={ProductImage}
              alt="imagem selecionada"
              w={"full"}
              h={"full"}
              resizeMode="cover"
            />
            <Pressable 
              position={"absolute"} 
              right={1} 
              top={1} 
              w={4} 
              h={4} 
              rounded={"full"} 
              bg={"gray.700"} 
              justifyContent={"center"} 
              alignItems={"center"} 
            >
              <Icon as={<X color={colors.gray[100]} size={10} weight="bold"/>}  />
            </Pressable>
          </Box>
          <TouchableOpacity>
            <Box w={25} h={25} justifyContent={"center"} alignItems={"center"} rounded={"lg"} bg={"gray.300"} >
              <Icon as={<Plus color={colors.gray[400]}/>}  />
            </Box>
          </TouchableOpacity>   
        </HStack>

        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Sobre o produto
        </Heading>
        <Controller 
          name='name'
          control={control}
          render={({ field: { value, onChange }}) => (
            <Input 
              placeholder="Título do anúncio"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              mt={3}
            />
          )}
        />

        <Controller 
          name='description'
          control={control}
          render={({ field: { value, onChange }}) => (
            <>
              <TextArea
                placeholder="Descrição do produto"
                value={value}
                onChangeText={onChange}
                autoCompleteType={{}}
                alignItems={'baseline'}
                bgColor={"gray.100"}
                placeholderTextColor={"gray.400"}
                color={"gray.600"}
                fontSize={"md"}
                rounded={"lg"}
                h={32}
                px={2}
                py={3}
                borderWidth={0}
                _focus={{
                  borderWidth: 1,
                  borderColor: "gray.600",
                }}
                isInvalid={!!errors.description?.message}
                _invalid={{
                  borderWidth: 1,
                  borderColor: "red.500"
                }}
              />
              {errors.description?.message && 
                <Text color={"red.500"} fontSize={'xs'} mt={2}>
                  {errors.description?.message}
                </Text>
              }
            </>
          )}
        />

        <Controller 
          name='state'
          control={control}
          render={({ field: { value, onChange }}) => (
            <FormControl isInvalid={!!errors.state?.message}>
              <Radio.Group
                name="myRadioGroup" 
                accessibilityLabel="favorite number" 
                value={value} 
                onChange={onChange}
              >
                <HStack mt={3}>
                  <Box pr={5}>
                    <Radio 
                      value="new_product"
                      _pressed={{ borderColor: 'blue.500'}} 
                      _checked={{ borderColor: 'lightBlue.500', _icon: { color: 'lightBlue.500'}, _pressed: { borderColor: 'blue.500'}}}
                    >
                      Produto novo
                    </Radio>
                  </Box>
                  <Box>
                    <Radio 
                      value="used_product"
                      _pressed={{ borderColor: 'blue.500'}} 
                      _checked={{ borderColor: 'lightBlue.500', _icon: { color: 'lightBlue.500'}, _pressed: { borderColor: 'blue.500'}}}
                    >
                      Produto usado
                    </Radio>
                  </Box>
                </HStack>
              </Radio.Group>
              <FormControl.ErrorMessage _text={{color: 'red.500'}}>
                {errors.state?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Venda
        </Heading>
        <Controller 
          name='price'
          control={control}
          defaultValue=""
          render={({ field: { value, onChange }}) => (
            <Input 
              placeholder="Valor do produto"
              value={formatCurrency(value)}
              onChangeText={onChange}
              errorMessage={errors.price?.message}
              mt={3}
              leftElement={
                <Text fontSize={'md'} color={"gray.700"} ml={3}>R$</Text>
              }
            />
          )}
        />

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
            <>
              <Checkbox.Group value={value} onChange={onChange} flex={1} accessibilityLabel="selecione os meios de pagamento aceitos">
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
              {errors.payment_methods?.message && 
                <Text color={"red.500"} fontSize={'xs'} mt={2}>
                  {errors.payment_methods?.message}
                </Text>
              }
            </>
          )}
        />

        <HStack mt={12}>
          <Button text="Cancelar" buttonColor="white-gray" flex={1} mr={3}/>
          <Button text="Avançar" isLoading={isSubmitting} buttonColor="gray" flex={1} onPress={handleSubmit(handleGoPreview)}/>
        </HStack>
      </ScrollView>
    </VStack>
  )
}