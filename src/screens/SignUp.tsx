import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system"

import LogoImg from '@assets/logo.png'
import { UserAvatar } from "@components/UserAvatar";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

const signUpFormSchema = yup.object({
  name: yup.string().required('Nome deve ser informado').min(3, 'Nome dever conter pelo menos 3 caracteres'),
  email: yup.string().required('E-mail deve ser informado').email('Escreva um formato de email válido'),
  phone: yup.string().required('Telefone deve ser informado').matches(/(\(?\d{2}\)?\s)?(\d{8,9})/, 'formato invalido'),
  password: yup.string().required('Senha deve ser informado').min(6, 'Senha deve conter no mínimo 6 caracteres'),
  password_confirm: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'As senhas não conferem.')
})

type SignUpFormData = yup.InferType<typeof signUpFormSchema>

export function SignUp() {
  const { control, handleSubmit, formState: { errors, isSubmitting} } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema)
  })

  const [photoUri, setPhotoUri] = useState('')

  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn, user } = useAuth()

  function handleNavigateSignIn() {
    navigation.navigate('signIn')
  }

  async function handleSignUp({name, email, phone, password}: SignUpFormData) {
    const signUpForm = new FormData()

    if (!!photoUri) {
      const fileExtension = photoUri.split('.').pop()

      const photoFile = {
        name: `${name.replace(' ', '_')}.${fileExtension}`.toLowerCase(),
        uri: photoUri,
        type: `image/${fileExtension}`
      } as any
      
      signUpForm.append('avatar', photoFile)
    }

    signUpForm.append('name', name)
    signUpForm.append('email', email)
    signUpForm.append('tel', phone)
    signUpForm.append('password', password)

    try {
      await api.post('/users', signUpForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError  
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde'
      
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function handleSelectPhoto() {
    const photo = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [4, 4],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (photo.canceled) return

    const photoUri = photo.assets[0].uri 

    if (photoUri) {
      const photoInfo = await FileSystem.getInfoAsync(photoUri) as FileInfo

      if (photoInfo.size / 1024 / 1024 > 10) {
        return toast.show({
          title: 'Imagem muito grande, selecione uma até 10MB',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setPhotoUri(photoUri)

      toast.show({
        title: 'Foto selecionada',
        placement: 'top',
        bgColor: 'green.500'
      })
    }
  }
 
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
        <TouchableOpacity onPress={handleSelectPhoto}>
          <UserAvatar 
            siz={"2xl"} 
            source={{ uri: photoUri }} 
            mb={4}
          />
        </TouchableOpacity>

        <Controller 
          name="name"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller 
          name="email"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="E-mail"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller 
          name="phone"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Telefone"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}  
              errorMessage={errors.phone?.message}
            />
          )}
        />

        <Controller 
          name="password"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Senha"
              secure
              value={value}
              onChangeText={onChange}  
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller 
          name="password_confirm"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Confirmar senha"
              secure
              value={value}
              onChangeText={onChange}  
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />

        <Button 
          text="Criar"
          onPress={handleSubmit(handleSignUp)}
          buttonColor="gray"
          isLoading={isSubmitting}
        />

        <Text mt={10} fontFamily={"body"} color={"gray.600"}>Já tem uma conta?</Text>

        <Button
          text="Ir para login" 
          buttonColor="white-gray"
          mt={3} 
          onPress={handleNavigateSignIn}
        />
      </Center>
    </VStack>
  )
}