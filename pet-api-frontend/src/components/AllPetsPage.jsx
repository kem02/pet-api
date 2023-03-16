import { Box, Button, Card, Flex, Text, CardBody, Stack, Heading, Divider, Image,  } from "@chakra-ui/react";
import { useState } from "react";
import {  useLoaderData } from "react-router-dom";


export default function AllPetsPage() {
    const [showPets, setShowPets] = useState(false);

    const petData = useLoaderData();
    const allPets = petData.allPets;
    console.log(allPets);

    const handleClick = () => {
        setShowPets(prevState => !prevState)
    }
    return (
        <Box  
        align={'center'}
        justify={'center'}
        // border="1px solid black" 
        >
            <Button onClick={handleClick} >Click to {showPets ? "hide" : "show"} all pets</Button>
            {
                showPets ?
                    <Flex 
                    // border="1px solid black" 
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                    gap={8}
                    mt="2rem"
                    >
                        {
                            allPets.map((item) => (
                                <Card
                                    minW="sm"
                                    maxW='sm'
                                    flex="0 0 20%"
                                    key={item.id}
                                >
                                    <CardBody>
                                        <Image
                                            src='https://placehold.jp/3d4070/ffffff/150x150.png'
                                            borderRadius='lg'
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>Pet's Name: {item.name}</Heading>
                                            <Text>Your pet's ID #: {item.id}</Text>
                                            <Text>Species: {item.species}</Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />

                                </Card>
                            ))
                        }
                    </Flex>
                    :
                    null
            }

           

        </Box>
    )
}


