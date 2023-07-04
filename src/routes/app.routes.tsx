import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ad } from '@screens/Ad';
import { CreateAd } from '@screens/CreateAd';
import { EditAd } from '@screens/EditAd';

import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { PreAd } from '@screens/PreAd';
import { View, useTheme } from 'native-base';

type AppRoutes = {
  home: undefined
  ad: undefined
  logout: undefined
  my_ads: undefined
  create_ad: undefined
  edit_ad: undefined
  pre_ad: undefined
}

export type AuthNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes(){
  const { colors } = useTheme()

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
    }}>
      <Screen
        name='home'
        component={Home}
      />

      <Screen
        name='my_ads'
        component={MyAds}
      />

      <Screen
        name='logout'
        component={View}
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
          tabBarButton: () => null
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
        name='edit_ad'
        component={EditAd}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name='create_ad'
        component={CreateAd}
        options={{
          tabBarButton: () => null
        }}
      />

    </Navigator>
  )
}
