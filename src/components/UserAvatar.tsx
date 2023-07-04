import { Avatar, IAvatarProps } from "native-base";
import { User } from "phosphor-react-native";

const IconSize = {
  sm: 12,
  md: 30,
  '2xl': 70,
} as const

type Props = IAvatarProps & {
  siz: '2xl' | 'md' | 'sm'
}

export function UserAvatar({ siz = 'md', ...rest}: Props) {
  return (
    <Avatar 
      size={siz}
      borderWidth={'2%'} 
      borderColor={"lightBlue.500"}
      bgColor={"gray.200"}
      color={"gray.400"}
      {...rest}
    >
      <User size={IconSize[siz]} weight="bold" color="#D9D8DA"/>
    </Avatar>
  )
}