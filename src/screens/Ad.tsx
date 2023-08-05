import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, Image, ScrollView, Skeleton, Text, VStack, useTheme, useToast } from "native-base";
import { PencilSimpleLine, Power, Trash, WhatsappLogo } from "phosphor-react-native";

import { Header } from "@components/Header";
import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";
import { useCallback, useState } from "react";
import { Loading } from "@components/Loading";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AdDTO } from "@dtos/AdDTO";
import { PaymentMethod } from "@components/PaymentMethod";

type AdParams = {
  id: string
}

export function Ad() {
  const [isLoading, setIsLoading] = useState(true)
  const [ad, setAd] = useState<AdDTO>()
  const { colors } = useTheme()
  const toast = useToast()
  const isAdOwner = true

  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const params = route.params as AdParams
  const [imageLoaded, setImageLoaded] = useState(false)

  async function getAd(adId: string) {
    try {
      setIsLoading(true)
      const response = await api.get(`/products/${adId}`)
      setAd(response.data)
      console.log(response.data.product_images)
      setIsLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar o anúncio, tente novamente!'

      toast.show({
        title,
        placement: 'top',
        color: 'red.500'
      })

      setIsLoading(false)
      navigation.goBack() 
    }
  }

  const productImageLoad = `${api.defaults.baseURL}/images/${ad?.product_images[0].path}`

  const handleImageLoad = () => {
    setImageLoaded(true)
  }


  useFocusEffect(useCallback(() => {
    getAd(params.id)
  }, [params.id]))

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1}  >
      <Header px={6} pt={5} mb={3} iconRight={isAdOwner && <PencilSimpleLine />}/>
      <ScrollView contentContainerStyle={{ paddingBottom: 30}}>
        <Box
        w={"full"}
        h={'270px'}
        >
          <Image 
            source={{ uri: productImageLoad}}
            onLoad={handleImageLoad}
            alt={`foto do ${ad?.name}`}
            w={"full"}
            h={"full"}
            resizeMode="cover"
          />
          <MultiStep size={3} currentStep={1}/>
          {!imageLoaded && 
            <Skeleton position={"absolute"} rounded={"lg"} w={"full"} h={"full"} bgColor={"gray.400"} zIndex={2}/>
          }
          {
          !ad?.is_active &&
          <>
            <Box position={"absolute"} w={"full"} h={"full"} bg={"gray.700"} opacity={0.5} />        
            <Box 
              position={"absolute"}
              alignItems={"center"}
              justifyContent={"center"}
              w={'full'}
              h={"full"}
            >
              <Text color={"gray.100"} fontFamily={"heading"} fontSize={"md"}>ANÚNCIO DESATIVADO</Text> 
            </Box>
          </>  
        }
        </Box>
        <VStack mt={5} px={6}>
          <HStack mb={6} alignItems={"center"}>
            <UserAvatar
              source={{ uri: 'https://github.com/killer-cf.png'}}
              siz="sm"
              mr={2}
            />
            <Text color={"gray.600"} fontSize={'sm'}>
              {ad?.user.name}
            </Text>
          </HStack>

          <Tag title="NOVO" alignSelf={'start'}/>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Heading fontFamily={"heading"} fontSize={"xl"} color={"gray.700"} my={2}>
              {ad?.name}
            </Heading>
            <HStack>
              <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
              <Heading fontSize={'xl'} color={"lightBlue.500"} fontFamily={"heading"}>1.200,00</Heading>
            </HStack>
          </HStack>
          <Text color={"gray.600"} fontSize={'sm'} mb={6}>
            {ad?.description}
          </Text>

          <HStack alignItems={"center"}>
            <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} >
              Aceita troca?
            </Heading>
            <Text color={"gray.600"} fontSize={'sm'} ml={2}>
              {ad?.accept_trade ? 'Sim' : 'Não'}
            </Text>
          </HStack>

          <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} mt={3} mb={2}>
            Meios de pagamento:
          </Heading>
          {ad?.payment_methods.map(paymentMethod => (
            <PaymentMethod key={paymentMethod.key} title={paymentMethod.key} />
          ))}

          {
            isAdOwner ? (
              <VStack mt={8}>
                { ad?.is_active ? 
                    <Button text="Desativar anúncio" buttonColor="gray" icon={<Power color={colors.gray[100]} />} mb={3}/> :
                    <Button text="Reativar anúncio" buttonColor="blue" icon={<Power color={colors.gray[100]} />} mb={3}/>
                }    
                <Button text="Excluir anúncio" buttonColor="white-gray" icon={<Trash />}/>
              </VStack>
            ) : (
              <HStack mt={8}>
                <HStack flex={1}>
                  <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
                  <Heading fontSize={'2xl'} color={"lightBlue.500"} fontFamily={"heading"}>1.200,00</Heading>
                </HStack>
                <Button 
                  text="Entrar em contato" 
                  flex={1} 
                  icon={<WhatsappLogo weight="fill" color={colors.gray[200]}/> }
                />
              </HStack>
            )
          }    
        </VStack>
      </ScrollView>
    </VStack>
  )
}