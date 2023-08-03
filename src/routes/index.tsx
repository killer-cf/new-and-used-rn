import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { FilterModalProvider } from "@contexts/FilterModalProvider";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { colors } = useTheme()
  const { user } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[200]

  return (
    <FilterModalProvider>
      <Box flex={1} bg={'gray.700'}>
        <NavigationContainer theme={theme}>
          {user?.name ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </Box>
    </FilterModalProvider>
  )
}