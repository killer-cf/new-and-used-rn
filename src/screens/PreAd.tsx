import { useState } from "react";
import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, Tag } from "phosphor-react-native";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

import { PaymentMethod } from "@components/PaymentMethod";
import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag as TagF } from "@components/Tag";
import { Button } from "@components/Button";
import { AdFormData } from "./AdForm";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";

type PreAdParams = {
  data: AdFormData,
  action: 'edit' | 'create'
}

export function PreAd() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const [currentImage, setCurrentImage] = useState(1)
  
  const { colors } = useTheme()
  const route = useRoute()
  const toast = useToast()
  const { user } = useAuth()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const params = route.params as PreAdParams

  const { images, name, description, state, price, accept_trade, payment_methods, id } = params.data

  async function handleCreateAd() {
    try {
      setIsSubmittingForm(true)

      const product = createProductData()
      const productResponse = await api.post('/products', product)

      const productImagesForm = createProductImagesForm(productResponse.data.id)
      await uploadProductImages(productImagesForm)

      setIsSubmittingForm(false)
      navigation.navigate('my_ads')

      showToast('Produto publicado com sucesso!', 'green.500')
    } catch (error) {
      handleFormSubmissionError(error, 'Não foi possível publicar seu anúncio, tente novamente mais tarde')
    }
  }

  async function handleEditAd() {
    if (!id) return

    try {
      setIsSubmittingForm(true)

      const product = createProductData()
      await api.put(`/products/${id}`, product)

      const productImagesForm = createProductImagesForm(id)
      if (productImagesForm.getAll('images').length > 0) {
        await uploadProductImages(productImagesForm)
      }

      setIsSubmittingForm(false)
      navigation.navigate('my_ads')

      showToast('Produto editado com sucesso!', 'green.500')
    } catch (error) {
      handleFormSubmissionError(error, 'Não foi possível editar seu anuncio, tente novamente mais tarde')
    }
  }

  function createProductData() {
    return {
      name,
      description,
      is_new: state === 'new_product',
      price: parseFloat(price.replaceAll('.', '').replace(',', '')),
      accept_trade,
      payment_methods
    }
  }

  function createProductImagesForm(productId: string) {
    const productImagesForm = new FormData()
    productImagesForm.append('product_id', productId)
  
    images.forEach((image, index) => {
      if (!image.id) {
        const imageUri = image.uri
        const fileExtension = imageUri.split('.').pop()
  
        const imageFile = {
          name: `${name.replace(' ', '_')}${index}.${fileExtension}`.toLowerCase(),
          uri: imageUri,
          type: `image/${fileExtension}`
        } as any
  
        productImagesForm.append('images', imageFile)
      }
    })

    return productImagesForm
  }

  async function uploadProductImages(form: FormData) {
    await api.post('/products/images', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  function handleFormSubmissionError(error: unknown, defaultMessage: string) {
    const isAppError = error instanceof AppError
    const title = isAppError ? error.message : defaultMessage
  
    showToast(title, 'red.500')
    setIsSubmittingForm(false)
  }

  function showToast(title: string, bgColor: string) {
    toast.show({
      title,
      placement: 'top',
      bgColor
    })
  }

  function handleGoBack() {
    navigation.navigate('ad_form', params.data)
  }

  const width = Dimensions.get('window').width;

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
          <Carousel
            loop
            width={width}
            height={270}
            data={images ?? []}
            scrollAnimationDuration={800}
            onSnapToItem={(index) => setCurrentImage(index + 1)}
            renderItem={({ index }) => (
              <Image 
                source={{ uri: images[index].uri }}
                alt={name}
                w={"full"}
                h={"full"}
                resizeMode="cover"
                bg={"green.200"}
              /> 
            )}
            />
          <MultiStep size={images.length} currentStep={currentImage}/>
        </Box>
        <VStack mt={5} px={6}>
          <HStack mb={6} alignItems={"center"}>
            <UserAvatar
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
              siz="sm"
              mr={2}
            />
            <Text color={"gray.600"} fontSize={'sm'}>
              {user.name}
            </Text>
          </HStack>

          <TagF title={state === 'new_product' ? 'NOVO' : 'USADO' } alignSelf={'start'}/>
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
            <PaymentMethod key={payment_method} title={payment_method} />
          ))}
        </VStack>
      </ScrollView>
      <HStack bg={"gray.200"} px={6} pt={5} position={'fixed'} bottom={1} safeAreaBottom>
        <Button 
          text="Voltar e editar" 
          onPress={handleGoBack}
          isDisabled={isSubmittingForm}
          flex={1} 
          buttonColor="white-gray" 
          icon={<ArrowLeft size={20} />} 
          mr={3}
        />
        <Button 
          text={params.action === 'create' ? "Publicar" : "Salvar"}
          onPress={params.action === 'create' ? handleCreateAd : handleEditAd}
          flex={1} 
          isLoading={isSubmittingForm}
          buttonColor="light-blue" 
          icon={<Tag size={20} color={colors.gray[100]}/>}
        />
      </HStack>
    </VStack>
  )
}