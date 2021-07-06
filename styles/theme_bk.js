import { extendTheme } from '@chakra-ui/react'
import styled from '@emotion/styled'

const Box = {
  baseStyle: {
    bg: "white"
  },
  variants: {
    bankless: {
      bg: 'red',
      border: "1px solid bloack"
    }
  },
  defaultProps: {
    variants : "bankless"
  }
}

const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    redOutline: {
      border: "1px solid",
      borderColor: "red.500",
      color: "red.500",
      bg: "transparent"
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "redOutline",
  },
}
const theme = extendTheme({

  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    dark:  "#990000",
    gray: {
      1: "#DADADA",
      2: "#C7C7C7",
      3: "#999999",
      4: "#5B5B5B"
    },
    red: {
      base: "#ff2222",        
    },
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.1",
        color: "black",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  
  components: {
   Button,
   Box
  },
})



export default theme