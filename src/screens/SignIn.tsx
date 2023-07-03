import { Center, Heading, Image, Text, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";

export function SignIn() {
  return (
    <VStack pt={32} flex={1} bgColor={"gray.200"} px={10}>
      <Center>
        <Image 
          source={LogoImg}
          alt='logo'
          w={24}
          h={16}
        />
        <Heading fontFamily={"heading"} fontSize={'4xl'} color={"gray.700"}>
          novosUsados
        </Heading>
        <Text color={"gray.500"} fontSize={"sm"}>
          Seu espaço de compra e venda
        </Text>
      </Center>

      <Center pt={20}>
        <Text>Acesse sua conta</Text>
        <Input
          placeholder="E-mail"
          my={4}
        />
        <Input
          placeholder="Senha"
          secure
        />
      </Center>
    </VStack>
  )
}