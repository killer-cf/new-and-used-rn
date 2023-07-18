import { Box, HStack, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BikeImg from "@assets/bike.png"
import { Header } from "@components/Header";
import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag } from "@components/Tag";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";
import { Button } from "@components/Button";

export function Ad() {
  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1}  >
      <Header px={6} pt={5} mb={3}/>
      <ScrollView contentContainerStyle={{ paddingBottom: 300}}>
        <Box
        w={"full"}
        h={'50%'}
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

          <Tag title="NOVO" alignSelf={'start'}/>
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

          <HStack mt={12}>
            <HStack flex={1}>
              <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
              <Heading fontSize={'2xl'} color={"lightBlue.500"} fontFamily={"heading"}>1.200,00</Heading>
            </HStack>
            <Button text="Entrar em contato" flex={1} />
          </HStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}