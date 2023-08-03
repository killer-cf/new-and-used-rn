import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker"

import { MultiStep } from "@components/MultiStep";
import { UserAvatar } from "@components/UserAvatar";
import { Tag as TagF } from "@components/Tag";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AdFormData } from "./AdForm";
import { PaymentMethod, PaymentMethodsType } from "@components/PaymentMethod";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function PreAd() {
  const { colors } = useTheme()

  const route = useRoute()
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const params = route.params as AdFormData

  const { images, name, description, state, price, accept_trade, payment_methods } = params

  async function handleSubmitAdForm() {
    const product = {
      name,
      description,
      is_new: state === 'new_product' ? true : false,
      price: parseFloat(price.replace('.', '').replace(',', '.')),
      accept_trade,
      payment_methods
    }

    try {
      const productResponse = await api.post('/products', product)

      const productImagesForm = new FormData()
      productImagesForm.append('product_id', productResponse.data.id)//

      images.forEach((image: ImagePicker.ImagePickerAsset, index) => {
        const imageUri = image.uri
        const fileExtension = imageUri.split('.').pop()

        const imageFile = {
          name: `${name.replace(' ', '_')}${index}.${fileExtension}`.toLowerCase(),
          uri: imageUri,
          type: `image/${fileExtension}`
        } as any

        productImagesForm.append('images', imageFile)
      })

      await api.post('/products/images', productImagesForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      navigation.navigate('home')

      toast.show({
        title: 'Produto publicado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível publicar seu anuncio, tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  function handleGoBack() {
    navigation.navigate('ad_form', params)
  }

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
            <PaymentMethod key={payment_method} title={payment_method as PaymentMethodsType} />
          ))}
        </VStack>
      </ScrollView>
      <HStack bg={"gray.200"} px={6} pt={5} position={'fixed'} bottom={1} safeAreaBottom>
        <Button 
          text="Voltar e editar" 
          onPress={handleGoBack}
          flex={1} 
          buttonColor="white-gray" 
          icon={<ArrowLeft size={20} />} 
          mr={3}
        />
        <Button 
          text="Publicar"
          onPress={handleSubmitAdForm}
          flex={1} 
          buttonColor="light-blue" 
          icon={<Tag size={20} color={colors.gray[100]}/>}
        />
      </HStack>
    </VStack>
  )
}