import Head from 'next/head'
import Image from 'next/image'

import { 
  Box, 
  Text, 
  Flex, 
  Heading, 
  Button, 
  Stack,   
} from "@chakra-ui/react";
import styled from '@emotion/styled'
import Footer from '../components/Footer';

export default function Home() {

  return (
    <Box p="5">
      <Flex
        bg="white" 
        p="100" 
        direction="column" 
        >
        <Heading>
          Interest-free liquidity at your fingertips
        </Heading>
        <Text>
          Draw our LUSD stablecoin against ETH at 0% interest.
        </Text>
      </Flex>
      
      <Stack  direction={["column", "row"]} my="3" spacing="3">
        <Box 
          h="500px" 
          display="flex" 
          flexDirection="column" 
          justifyContent="space-around" 
          p="5" 
          w={["100%", "25%"]} 
          colorScheme="brand" 
          bg="white">
          
          <Heading textAlign="center" size="md">
            Get rewards by depositing LUSD in stability pool
          </Heading>
          <Text textAlign="center" size="sm">
            Earn LQTY rewards and liquidation gains for securing Liquity by providing LUSD to the Stability Pool.
          </Text>
          <Button mt="3" >
            Click me
          </Button>
          <hr />
          <Box>
            <Text>Altready deposited</Text>
            <Heading>100M LUSD</Heading>
            <Box ><img src=""></img></Box>
          </Box>
        </Box>
        <Box p="5" rounded="md" w={["100%", "50%"]}  bgGradient="linear(to-b, red.500, red.900)">
          <Heading textAlign="center">Boorow against collateral</Heading>
          <Stack mt="3" direction={["column", "row"]}>
            <Box h="200px" w={["100%","60%"]} bg="palette.red">Image</Box>
            <Stack p="3" direction="column">
              <Text>Total value locked</Text>
              <Text>123.213444.</Text>
            </Stack>
          </Stack>
          <Stack textAlign="center" mt="3" p="5" direction={["column", "row"]}>
              <Text>someinfo here</Text>
              <Text>someother info there</Text>
              <Text>and some more</Text>
          </Stack>
        </Box>
        <Box rounded="md" p="5" w={["100%", "25%"]}  bg="white">
          <Heading size="sm">Earn fees by stacking LQTY</Heading>
          <Stack>

          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" p="5" bgGradient="linear(to-b, red.500, red.900)">
        <Heading>How it works</Heading>
        <Box  display="flex" justifyItems="center" flexDirection="column">
          <Stack justifyContent="center" direction={["column-reverse", "row"]} my="3" spacing="3">
            <Box><img src="#"></img></Box>
            <Box>Text</Box>
          </Stack>
          <Stack justifyContent="center" direction={["column-reverse", "row"]} my="3" spacing="3">
            <Box><img src="#"></img></Box>
            <Box>Text</Box>
          </Stack>
          <Stack justifyContent="center" direction={["column-reverse", "row"]} my="3" spacing="3">
            <Box><img src="#"></img></Box>
            <Box>Text</Box>
          </Stack>
        </Box>
        
      </Stack>
      <Box mt="3" p="5"  bg="white">
          <Heading size="md">Fees and charges</Heading>
          <Stack mt="3" justifyContent="space-around" direction={["column","row"]}>
            <Box>
              <Text as="b" fontSize="sm">title</Text>
              <Text fontSize="xs">descirption</Text>
            </Box>
            <Box>
              <Text as="b" fontSize="sm">title</Text>
              <Text fontSize="xs">descirption</Text>
            </Box>
            <Box>
              <Text as="b" fontSize="sm">title</Text>
              <Text fontSize="xs">descirption</Text>
            </Box>
          </Stack>
        </Box>
        <Footer></Footer> 
    </Box>
  );
}