import { Box, Flex, Text } from "@chakra-ui/react"

export default function ErrorPage() {
    return (
        <Flex justifyContent="center" mt="150px">
            <Text color="blue.500" fontWeight="bold">404 <br />PAGE NOT FOUND  <br /> Please check your URL or return to the Home Page. </Text>
            
        </Flex>

    )
}