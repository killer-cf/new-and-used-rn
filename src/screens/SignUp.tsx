import { Avatar, Center, Heading, Image, Text, VStack, View } from "native-base";

import LogoImg from '../assets/logo.png'
import defaultUserPhoto from '../assets/userPhotoDefault.png'
import { Horse, Heart, Cube, User, PencilSimpleLine } from 'phosphor-react-native';
import { UserAvatar } from "../components/UserAvatar";

export function SignUp() {
  return (
    <VStack pt={24} px={12}>
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

      <Center mt={12}>
        <UserAvatar siz={"2xl"} source={{ uri: 'https://github.comkiller-cf.png'}}/>
      </Center>
    </VStack>
  )
}