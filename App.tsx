import React from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { theme } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  const [ fontsLoaded ] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <AuthContextProvider>
          { fontsLoaded && <Routes />}
        </AuthContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
