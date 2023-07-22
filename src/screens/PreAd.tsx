import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money,  QrCode, Tag } from "phosphor-react-native";

import BikeImg from "@assets/bike.png"
import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag as TagF } from "@components/Tag";
import { Button } from "@components/Button";

export function PreAd() {
  const { colors } = useTheme()

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
            source={BikeImg}
            alt="nome do produto"
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
              Bicicleta
            </Heading>
            <HStack>
              <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
              <Heading fontSize={'xl'} color={"lightBlue.500"} fontFamily={"heading"}>1.200,00</Heading>
            </HStack>
          </HStack>
          <Text color={"gray.600"} fontSize={'sm'} mb={6}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
          </Text>

          <HStack alignItems={"center"}>
            <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} >
              Aceita troca?
            </Heading>
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Sim
            </Text>
          </HStack>

          <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} mt={3} mb={2}>
            Meios de pagamento:
          </Heading>
          <HStack  mb={1}>
            <Barcode />
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Boleto
            </Text>
          </HStack>
          <HStack  mb={1}>
            <QrCode />
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Pix
            </Text>
          </HStack>
          <HStack  mb={1}>
            <Money />
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Dinheiro
            </Text>
          </HStack>
          <HStack  mb={1}>
            <CreditCard />
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Cartão de Crédito
            </Text>
          </HStack>
          <HStack  mb={1}>
            <Bank />
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              Depósito Bancário
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
      <HStack bg={"gray.200"} px={6} pt={5} position={'fixed'} bottom={1} safeAreaBottom>
        <Button text="Voltar e editar" flex={1} buttonColor="white-gray" icon={<ArrowLeft size={20} />} mr={3}/>
        <Button text="Publicar" flex={1} buttonColor="light-blue" icon={<Tag size={20} color={colors.gray[100]}/>}/>
      </HStack>
    </VStack>
  )
}