import { 
Box
} from "@chakra-ui/react";

export default function Footer() {

    return (
        <Box p="5" my="3" bgGradient="linear(to-b, red.500, red.900)" textColor="white">
            <h1>This is the Footer</h1>
        </Box>        
    );
}