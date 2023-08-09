import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Box, Checkbox, FormControl, HStack, Heading, Icon, Image, Pressable, Radio, ScrollView, Switch, Text, TextArea, VStack, useTheme, useToast } from "native-base";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker"

import { Header } from "@components/Header";
import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { formatCurrency } from "@utils/formatCurrency";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { PaymentMethodsType } from "@dtos/PaymentMethodDTO";

export type PhotoAdFormType = {
  id: string | null | undefined
  uri: string
}

const adFormSchema: yup.ObjectSchema<AdFormData> = yup.object({
  id: yup.string().required().nullable(),
  name: yup.string().required('Informe o nome do produto'),
  description: yup.string().required('Informe a descrição do produto').min(10, 'Descrição deve ter um mínimo de 10 caracteres'),
  state: yup.string().oneOf(['new_product', 'used_product']).required('Selecione o estado do produto'),
  price: yup.string().required('Informe o preço do produto'),
  accept_trade: yup.boolean().required(),
  payment_methods: yup.array().required('Informe ao menos 1 método de pagamento'),
  images: yup.array().min(1, 'Adicione ao menos 1 imagem').required()
})

export type AdFormData = {
  id: string | null
  name: string
  description: string
  state: "new_product" | "used_product"
  price: string
  accept_trade: boolean
  payment_methods: PaymentMethodsType[]
  images: PhotoAdFormType[]
}

export function AdForm() {
  const route = useRoute()
  const params = route.params as AdFormData

  const { control, handleSubmit, reset, clearErrors, setValue, formState: { errors } } = useForm<AdFormData>({
    resolver: yupResolver(adFormSchema),
    values: {
      id: params?.id ?? null,
      name: params?.name ?? '',
      description: params?.description ?? '',
      price: formatCurrency(params?.price ?? '0') ?? '0,00',
      state: params?.state ?? 'new_product',
      accept_trade: params?.accept_trade ?? false,
      payment_methods: params?.payment_methods ?? [],
      images: params?.images ?? [],
    }
  })

  const [photos, setPhotos] = useState<PhotoAdFormType[]>([])

  const { colors } = useTheme()
  const toast = useToast()
  
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoPreview(data: AdFormData) {
    reset()
    setPhotos([])

    navigation.navigate('pre_ad', {
      data,
      action: data.id ? 'edit' : 'create' 
    })
  }

  async function handleSelectPhotos() {
    const selectedPhotos = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      aspect: [5, 4],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3 - photos.length,
    })

    if (selectedPhotos.canceled) return

    if (selectedPhotos.assets.length > 3 || selectedPhotos.assets.length + photos.length > 3) {
      return toast.show({
        title: 'Selecione até 3 fotos',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    const newPhotos = selectedPhotos.assets.map(photo => ({
      id: null,
      uri: photo.uri
    })) 

    setPhotos((state) => [...state, ...newPhotos])
    setValue('images', [...photos, ...newPhotos])

    toast.show({
      title: 'Foto selecionada',
      placement: 'top',
      bgColor: 'green.500'
    })
  }

  async function handleRemovePhoto(index: number) {
    const newPhotos = [...photos]
    const photoToDeleteId = newPhotos[index].id

    if (photoToDeleteId) {
      await removePhotoFromDB(photoToDeleteId)
    } 

    newPhotos.splice(index, 1)
    setPhotos(newPhotos);
    setValue('images', newPhotos)
  }

  async function removePhotoFromDB(imageId: string){
    try {
      await api.delete('/products/images', {
        data: { images: [imageId] }
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível excluir a imagem, tente novamente'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  function handleCancel() {
    reset()
    setPhotos([])

    navigation.goBack()
  }
  
  useFocusEffect(useCallback(() => {
    clearErrors()
    setPhotos(params?.images || [])
  }, [params?.images]))

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
      <Header title={`${params?.id ? 'Editar' : 'Criar'} anúncio`} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40}} showsVerticalScrollIndicator={false}>
        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Imagens
        </Heading>
        <Text color={"gray.500"} fontSize={'sm'}>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <HStack mt={3}>
          {photos?.map((photo, index) => (
            <Box key={index} w={25} h={25} rounded={"lg"} overflow={"hidden"} mr={2}>
              <Image 
                source={{ uri: photo.uri }}
                alt="imagem selecionada"
                w={"full"}
                h={"full"}
                resizeMode="cover"
              />
              <Pressable 
                onPress={() => handleRemovePhoto(index)}
                position={"absolute"} 
                right={1} 
                top={1} 
                w={4} 
                h={4} 
                rounded={"full"} 
                bg={"gray.700"} 
                justifyContent={"center"} 
                alignItems={"center"} 
              >
              <Icon as={<X color={colors.gray[100]} size={10} weight="bold"/>}  />
            </Pressable>
          </Box>
          ))}
          { photos?.length < 3 && 
            <TouchableOpacity onPress={handleSelectPhotos}>
              <Box w={25} h={25} justifyContent={"center"} alignItems={"center"} rounded={"lg"} bg={"gray.300"} >
                <Icon as={<Plus color={colors.gray[400]}/>}  />
              </Box>
            </TouchableOpacity> 
          }
            
        </HStack>
        {errors.images?.message && 
          <Text color={"red.500"} fontSize={'xs'} mt={2}>
            {errors.images?.message}
          </Text>
        }

        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Sobre o produto
        </Heading>
        <Controller 
          name='name'
          control={control}
          render={({ field: { value, onChange }}) => (
            <Input 
              placeholder="Título do anúncio"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              mt={3}
            />
          )}
        />

        <Controller 
          name='description'
          control={control}
          render={({ field: { value, onChange }}) => (
            <>
              <TextArea
                placeholder="Descrição do produto"
                value={value}
                onChangeText={onChange}
                autoCompleteType={{}}
                alignItems={'baseline'}
                bgColor={"gray.100"}
                placeholderTextColor={"gray.400"}
                color={"gray.600"}
                fontSize={"md"}
                rounded={"lg"}
                h={32}
                px={2}
                py={3}
                borderWidth={0}
                _focus={{
                  borderWidth: 1,
                  borderColor: "gray.600",
                }}
                isInvalid={!!errors.description?.message}
                _invalid={{
                  borderWidth: 1,
                  borderColor: "red.500"
                }}
              />
              {errors.description?.message && 
                <Text color={"red.500"} fontSize={'xs'} mt={2}>
                  {errors.description?.message}
                </Text>
              }
            </>
          )}
        />

        <Controller 
          name='state'
          control={control}
          render={({ field: { value, onChange }}) => (
            <FormControl isInvalid={!!errors.state?.message}>
              <Radio.Group
                name="myRadioGroup" 
                accessibilityLabel="favorite number" 
                value={value} 
                onChange={onChange}
              >
                <HStack mt={3}>
                  <Box pr={5}>
                    <Radio 
                      value="new_product"
                      _pressed={{ borderColor: 'blue.500'}} 
                      _checked={{ borderColor: 'lightBlue.500', _icon: { color: 'lightBlue.500'}, _pressed: { borderColor: 'blue.500'}}}
                    >
                      Produto novo
                    </Radio>
                  </Box>
                  <Box>
                    <Radio 
                      value="used_product"
                      _pressed={{ borderColor: 'blue.500'}} 
                      _checked={{ borderColor: 'lightBlue.500', _icon: { color: 'lightBlue.500'}, _pressed: { borderColor: 'blue.500'}}}
                    >
                      Produto usado
                    </Radio>
                  </Box>
                </HStack>
              </Radio.Group>
              <FormControl.ErrorMessage _text={{color: 'red.500'}}>
                {errors.state?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
          Venda
        </Heading>
        <Controller 
          name='price'
          control={control}
          defaultValue=""
          render={({ field: { value, onChange }}) => (
            <Input 
              placeholder="Valor do produto"
              value={value}
              onChangeText={(text) => onChange(formatCurrency(text))}
              errorMessage={errors.price?.message}
              mt={3}
              leftElement={
                <Text fontSize={'md'} color={"gray.700"} ml={3}>R$</Text>
              }
            />
          )}
        />

        <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
          Aceita troca?
        </Heading>
        <Controller 
          name='accept_trade'
          control={control}
          render={({ field: { value, onChange }}) => (
            <Switch onTrackColor={"lightBlue.500"} value={value} onValueChange={onChange}/>
          )}
        />

        <Heading fontFamily={"heading"} fontSize={'sm'} mt={6} mb={3} color={"gray.600"} >
          Meios de pagamento aceitos
        </Heading>

        <Controller 
          name='payment_methods'
          control={control}
          render={({ field: { value, onChange }}) => (
            <>
              <Checkbox.Group defaultValue={[]} value={value} onChange={onChange} flex={1} accessibilityLabel="selecione os meios de pagamento aceitos">
                <HStack alignItems={"center"} mb={2}>
                  <Checkbox  value="boleto" accessibilityLabel="Boleto?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
                  <Text ml={2} fontFamily={"body"} fontSize={"md"}>Boleto</Text>
                </HStack>
                
                <HStack alignItems={"center"} mb={2}>
                  <Checkbox  value="pix" accessibilityLabel="Pix?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
                  <Text ml={2} fontFamily={"body"} fontSize={"md"}>Pix</Text>
                </HStack>

                <HStack alignItems={"center"} mb={2}>
                  <Checkbox  value="cash" accessibilityLabel="Dinheiro?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
                  <Text ml={2} fontFamily={"body"} fontSize={"md"}>Dinheiro</Text>
                </HStack>

                <HStack alignItems={"center"} mb={2}>
                  <Checkbox  value="card" accessibilityLabel="cartão de crédito?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
                  <Text ml={2} fontFamily={"body"} fontSize={"md"}>Cartão de crédito</Text>
                </HStack>

                <HStack alignItems={"center"} mb={2}>
                  <Checkbox  value="deposit" accessibilityLabel="Deposito bancário?" _checked={{backgroundColor: 'lightBlue.500', borderColor: 'lightBlue.500'}}/>
                  <Text ml={2} fontFamily={"body"} fontSize={"md"}>Deposito bancário</Text>
                </HStack>
              </Checkbox.Group>
              {errors.payment_methods?.message && 
                <Text color={"red.500"} fontSize={'xs'} mt={2}>
                  {errors.payment_methods?.message}
                </Text>
              }
            </>
          )}
        />

        <HStack mt={12}>
          <Button text="Cancelar" onPress={handleCancel} buttonColor="white-gray" flex={1} mr={3}/>
          <Button text="Avançar" buttonColor="gray" flex={1} onPress={handleSubmit(handleGoPreview)}/>
        </HStack>
      </ScrollView>
    </VStack>
  )
}