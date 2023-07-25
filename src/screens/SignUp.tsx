import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import LogoImg from '@assets/logo.png'
import { UserAvatar } from "@components/UserAvatar";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

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

  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNavigateSignIn() {
    navigation.navigate('signIn')
  }

  async function handleSignUp(data: SignUpFormData) {
    try {
      const response = await api.post('/users', {
        name: data.name,
        avatar: '',
        email: data.email,
        tel: data.phone,
        password: data.password
      })
      console.log(response.data)
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
        <UserAvatar siz={"2xl"} source={{ uri: 'https://github.com/killer-cf.png'}} mb={4}/>

        <Controller 
          name="name"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Nome"
              value={value}
              onChangeText={onChange}  
              mb={4}
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
              mb={4}
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
              mb={4}
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
              mb={4}
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
              mb={4}
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