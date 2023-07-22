import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8'
    },
    white: '#FFFFFF',
    lightRed: {
      500: '#EE7979'
    },
    lightBlue: {
      500: '#647AC7'
    },
    blue: {
      500: '#364D9D'
    }, 
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  sizes: {
    14: 56,
    19: 76,
    25: 100,
    28: 112,
    30: 120,
    33: 148
  },

  components: {
    Avatar: {
      Badge:{
        baseStyle: {
          size: 'xl',
          color: 'red'
        },

        sizes: {
          xl: {
            w: 50,
            h: 50
          }
        }
      }
      
    }
  }
})