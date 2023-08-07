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
import { formatCurrency } from "@utils/formatCurrency";
import { Alert } from "react-native";
import { useAuth } from "@hooks/useAuth";

type AdParams = {
  id: string
}

export function Ad() {
  const [isLoading, setIsLoading] = useState(true)
  const [ad, setAd] = useState<AdDTO>()
  const { colors } = useTheme()
  const { user: userLogged } = useAuth()
  const toast = useToast()
  const isAdOwner = ad?.user_id === userLogged.id

  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const params = route.params as AdParams
  const [imageLoaded, setImageLoaded] = useState(false)

  async function getAd(adId: string) {
    try {
      setIsLoading(true)
      const response = await api.get(`/products/${adId}`)
      setAd(response.data)
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

  function handleToggleActivateAd() {
    Alert.alert('Excluir', `Certeza que deseja ${ad?.is_active ? 'des' : 're' }ativar o anúncio "${ad?.name}"?`, [
      { text: 'Sim', onPress: () => toggleActivateAd() },
      { text: 'Não'},
    ])
  }

  async function toggleActivateAd() {
    try {
      await api.patch(`/products/${ad?.id}`, {
        is_active: !ad?.is_active,
      })

      toast.show({
        title: `Anúncio ${ad?.name} ${ad?.is_active ? 'des' : '' }ativado com sucesso!`,
        placement: 'top',
        color: 'green.500'
      })
      
      await getAd(params.id)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : `Não foi possível ${ad?.is_active ? 'des' : 're' }ativar o anúncio!`

      toast.show({
        title,
        placement: 'top',
        color: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  function handleDeleteAd() {
    Alert.alert('Excluir', `Certeza que deseja excluir o anúncio "${ad?.name}"?`, [
      { text: 'Sim', onPress: () => deleteAd() },
      { text: 'Não'},
    ])
  }

  async function deleteAd() {
    try {
      await api.delete(`/products/${ad?.id}`)
      navigation.goBack() 

      toast.show({
        title: `Anúncio ${ad?.name} excluído com sucesso!`,
        placement: 'top',
        color: 'green.500'
      })

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível deletar o anúncio!'

      toast.show({
        title,
        placement: 'top',
        color: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getAd(params.id)
  }, [params.id]))

  if (isLoading) {
    return <Loading />
  }

  const formattedPrice = formatCurrency(ad?.price.toString() || '')

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
              source={{ uri: `${api.defaults.baseURL}/images/${ad?.user.avatar}`}}
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
              <Heading fontSize={'xl'} color={"lightBlue.500"} fontFamily={"heading"}>{formattedPrice}</Heading>
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
                <Button
                  text={ad?.is_active ? "Desativar anúncio" : "Reativar anúncio"}
                  onPress={handleToggleActivateAd}
                  buttonColor={ad?.is_active ? "gray" : "blue"}
                  icon={<Power color={colors.gray[100]} />}
                  mb={3}
                />   
                <Button text="Excluir anúncio" onPress={handleDeleteAd} buttonColor="white-gray" icon={<Trash />}/>
              </VStack>
            ) : (
              <HStack mt={8}>
                <HStack flex={1}>
                  <Text pt={1} fontSize={'sm'} color={"lightBlue.500"} fontFamily={"heading"}>R$ </Text>
                  <Heading fontSize={'2xl'} color={"lightBlue.500"} fontFamily={"heading"}>{formattedPrice}</Heading>
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