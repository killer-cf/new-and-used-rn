import { useRoute } from "@react-navigation/native";
import { Box, Checkbox, HStack, Heading, Icon, Image, Pressable, Radio, ScrollView, Switch, Text, TextArea, VStack, useTheme } from "native-base";

import { Header } from "@components/Header";
import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import ProductImage from "@assets/product.png"
import { Input } from "@components/Input";
import { useState } from "react";
import { Button } from "@components/Button";

type AdFormParams = {
  id: string
  name: string
}

export function AdForm() {
  const [radioSelected, setRadioSelected] = useState('')
  const route = useRoute()
  const { colors } = useTheme()

  const params  = route.params as AdFormParams

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
        <Input 
          placeholder="Título do anúncio"
          mt={3}
          mb={3}
        />
        <TextArea
          autoCompleteType={{}}
          alignItems={'baseline'}
          bgColor={"gray.100"}
          placeholderTextColor={"gray.400"}
          placeholder="Descrição do produto"
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
          _invalid={{
            borderWidth: 1,
            borderColor: "red.500"
          }}
        />

        <Radio.Group
          name="myRadioGroup" 
          accessibilityLabel="favorite number" 
          value={radioSelected} 
          onChange={setRadioSelected}
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

        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Venda
        </Heading>
        <Input 
          placeholder="Valor do produto"
          mt={3}
          mb={3}
          leftElement={
            <Text fontSize={'md'} color={"gray.700"} ml={3}>R$</Text>
          }
        />

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

        <HStack mt={12}>
          <Button text="Cancelar" buttonColor="white-gray" flex={1} mr={3}/>
          <Button text="Avançar" buttonColor="gray" flex={1}/>
        </HStack>
      </ScrollView>
    </VStack>
  )
}