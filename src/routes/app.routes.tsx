import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Icon, View, useTheme } from 'native-base';
import { House, SignOut, Tag } from 'phosphor-react-native';
import { Platform } from 'react-native';

import { Ad } from '@screens/Ad';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { PreAd } from '@screens/PreAd';
import { AdForm } from '@screens/AdForm';

type AppRoutes = {
  home: undefined
  ad: undefined
  logout: undefined
  my_ads: undefined
  ad_form?: {
    id: string
    name: string
  }
  pre_ad: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes(){
  const { colors, sizes } = useTheme()

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[600],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto': 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={<House weight={focused ? 'bold': 'regular'} color={color} size={30}/>} />
          )
        }}
      />

      <Screen
        name='my_ads'
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={<Tag weight={focused ? 'bold': 'regular'} color={color} size={30}/>} />
          )
        }}
      />

      <Screen
        name='logout'
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon as={<SignOut weight={focused ? 'bold': 'regular'} color={colors.red[500]} size={30}/>} />
          )
        }}
        listeners={() => ({
          tabPress: (e) => {
              console.log(`sair`)
          },
      })} 
      />

      <Screen
        name='ad'
        component={Ad}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Screen
        name='pre_ad'
        component={PreAd}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name='ad_form'
        component={AdForm}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />

    </Navigator>
  )
}
