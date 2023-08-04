import { Spinner, Center, ICenterProps } from 'native-base'

type Props = ICenterProps & {}

export function Loading({...rest}: Props){
  return (
    <Center flex={1} {...rest}>
      <Spinner color='gray.500' />
    </Center>    
  )
}