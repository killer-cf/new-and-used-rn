import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";

import BikeImg from "@assets/bike.png"
import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag as TagF } from "@components/Tag";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { AdFormData } from "./AdForm";
import { PaymentMethod, PaymentMethodsType } from "@components/PaymentMethod";

export function PreAd() {
  const { colors } = useTheme()

  const route = useRoute()

  const params = route.params as AdFormData

  const { images, name, description, state, price, accept_trade, payment_methods } = params

  return (
    <VStack safeAreaTop flex={1} bg={"lightBlue.500"}>
      <VStack bg={"lightBlue.500"} w={"full"} py={4} >
        <Heading fontFamily={"heading"} color={"gray.100"} fontSize={"md"} textAlign={"center"}>
          Pré visualização do anúncio
        </Heading>
        <Text fontSize={'sm'} fontFamily={"body"} color={"gray.100"} textAlign={"center"}>
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>
      <ScrollView bg={"gray.200"} contentContainerStyle={{ paddingBottom: 30}}>
        <Box
        w={"full"}
        h={'270px'}
        >
          <Image 
            source={{ uri: images[0].uri }}
            alt={name}
            w={"full"}
            h={"full"}
            resizeMode="cover"
            bg={"green.200"}
          />
          <MultiStep size={3} currentStep={1}/>
        </Box>
        <VStack mt={5} px={6}>
          <HStack mb={6} alignItems={"center"}>
            <UserAvatar
              source={{ uri: 'https://github.com/killer-cf.png'}}
              siz="sm"
              mr={2}
            />
            <Text color={"gray.600"} fontSize={'sm'}>
              Kilder Filho
            </Text>
          </HStack>

          <TagF title="NOVO" alignSelf={'start'}/>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Heading fontFamily={"heading"} fontSize={"xl"} color={"gray.700"} my={2}>
              {name}
            </Heading>
            <HStack>
              <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
              <Heading fontSize={'xl'} color={"lightBlue.500"} fontFamily={"heading"}>{price}</Heading>
            </HStack>
          </HStack>
          <Text color={"gray.600"} fontSize={'sm'} mb={6}>
            {description}
          </Text>

          <HStack alignItems={"center"}>
            <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} >
              Aceita troca?
            </Heading>
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              {accept_trade ? 'Sim': 'Não'}
            </Text>
          </HStack>

          <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} mt={3} mb={2}>
            Meios de pagamento:
          </Heading>
          {payment_methods.map(payment_method => (
            <PaymentMethod title={payment_method as PaymentMethodsType} />
          ))}
        </VStack>
      </ScrollView>
      <HStack bg={"gray.200"} px={6} pt={5} position={'fixed'} bottom={1} safeAreaBottom>
        <Button text="Voltar e editar" flex={1} buttonColor="white-gray" icon={<ArrowLeft size={20} />} mr={3}/>
        <Button text="Publicar" flex={1} buttonColor="light-blue" icon={<Tag size={20} color={colors.gray[100]}/>}/>
      </HStack>
    </VStack>
  )
}