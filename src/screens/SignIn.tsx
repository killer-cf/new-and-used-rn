import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack } from "native-base";

import LogoImg from '@assets/logo.png'
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNavigateSignUp() {
    navigation.navigate('signUp')
  }

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
          mb={8}
        />

        <Button text="Entrar" />

        <Text mt={32} fontFamily={"body"} color={"gray.600"}>Ainda não tem acesso?</Text>

        <Button
          text="Criar uma conta" 
          buttonColor="white-gray"
          mt={3}
          onPress={handleNavigateSignUp}
        />
      </Center>
    </VStack>
  )
}