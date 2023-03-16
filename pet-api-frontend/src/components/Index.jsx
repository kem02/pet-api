import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import pets from "../assets/pets.png"

export default function Index() {
    return (
        <Box
            // border="black solid 1px"
            bg={`url(${pets})`}
            justifyContent="center"
            align="center"
            backgroundRepeat="no-repeat"
            backgroundSize="50% auto"
            backgroundPosition="bottom"
            width={"100%"}
            height={"900px"}

        >
            <Flex
                // border="1px solid black"
                justifyContent="center"
            >
                <Box
                    bg="rgba(52, 194, 255, 0.5)"
                    border="2px solid cyan"
                    borderRadius="3xl"
                    w="500px"
                    h="300px"
                    mt="150px"
                    mb="20px"
                >
                    <Heading
                        fontSize="2xl"
                        mt="100px"
                        style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
                    >
                        Welcome to the Pet Api page! <br /> Login to save and see your pets</Heading>
                </Box>
            </Flex>

        </Box>
    )
}