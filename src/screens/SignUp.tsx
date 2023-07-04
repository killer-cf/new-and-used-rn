import { Center, Heading, Image, Text, VStack, View } from "native-base";

import LogoImg from '../assets/logo.png'
import { UserAvatar } from "../components/UserAvatar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignUp() {
  return (
    <VStack pt={20} px={12} flex={1} bgColor={"gray.200"}>
      <Center>
        <Image 
          source={LogoImg}
          alt='logo'
          w={20}
          h={12}
        />
        <Heading fontFamily={"heading"} fontSize={'xl'} color={"gray.700"} mt={3}>
          Boas vindas!
        </Heading>
        <Text color={"gray.500"} fontSize={"sm"} textAlign={"center"} mt={1}>
          Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
        </Text>
      </Center>

      <Center mt={10}>
        <UserAvatar siz={"2xl"} source={{ uri: 'https://github.com/killer-cf.png'}} mb={4}/>

        <Input  
          placeholder="Nome"
          mb={4}
        />

        <Input  
          placeholder="E-mail"
          mb={4}
        />

        <Input  
          placeholder="Telefone"
          mb={4}
        />

        <Input  
          placeholder="Senha"
          secure
          mb={4}
        />

        <Input  
          placeholder="Confirmar senha"
          secure
          mb={6}
        />

        <Button 
          text="Criar"
          buttonColor="gray"
        />

        <Text mt={10} fontFamily={"body"} color={"gray.600"}>Já tem uma conta?</Text>

        <Button
          text="Ir para login" 
          buttonColor="white-gray"
          mt={3} 
        />
      </Center>
    </VStack>
  )
}