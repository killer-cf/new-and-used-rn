import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import LogoImg from '@assets/logo.png'
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

const signInFormSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('Formato de e-mail invalido'),
  password: yup.string().required('Informe a senha')
})

type SignInFormData = yup.InferType<typeof signInFormSchema>

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { handleSubmit, control, formState: { errors, isSubmitting }} = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const toast = useToast()

  const { signIn } = useAuth()

  function handleNavigateSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      await signIn(email, password)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível efetuar o login, tente novamente mais tarde"

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack pt={32} flex={1} bgColor={"gray.200"} px={10}>
      <Center>
        <Image 
          source={LogoImg}
          alt='logo'
          w={24}
          h={16}
        />
        <Heading fontFamily={"heading"} fontSize={'4xl'} color={"gray.700"}>
          novosUsados
        </Heading>
        <Text color={"gray.500"} fontSize={"sm"}>
          Seu espaço de compra e venda
        </Text>
      </Center>

      <Center pt={20}>
        <Text>Acesse sua conta</Text>

        <Controller 
          name="email"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}  
              errorMessage={errors.email?.message}
              autoCapitalize="none"
              mt={4}
            />
          )}
        />

        <Controller 
          name="password"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder="Senha"
              value={value}
              onChangeText={onChange}  
              errorMessage={errors.password?.message}
              secure
              mb={4}
            />
          )}
        />

        <Button text="Entrar" onPress={handleSubmit(handleSignIn)}/>

        <Text mt={32} fontFamily={"body"} color={"gray.600"}>Ainda não tem acesso?</Text>

        <Button
          text="Criar uma conta" 
          buttonColor="white-gray"
          mt={3}
          onPress={handleNavigateSignUp}
        />
      </Center>
    </VStack>
  )
}